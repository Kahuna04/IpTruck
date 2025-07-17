import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateDocumentDto,
  DocumentType,
  DocumentStatus,
} from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads';

  constructor(private prisma: PrismaService) {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async create(
    createDocumentDto: CreateDocumentDto,
    uploadedById: string,
  ): Promise<Document> {
    try {
      // Validate booking exists if bookingId is provided
      if (createDocumentDto.bookingId) {
        const booking = await this.prisma.booking.findUnique({
          where: { id: createDocumentDto.bookingId },
        });
        if (!booking) {
          throw new BadRequestException('Booking not found');
        }
      }

      const document = await this.prisma.document.create({
        data: {
          type: createDocumentDto.type,
          bookingId: createDocumentDto.bookingId,
          bidId: createDocumentDto.bidId,
          carrierId: createDocumentDto.carrierId,
          billOfLadingId: createDocumentDto.billOfLadingId,
          metadata: createDocumentDto.metadata,
          expiresAt: createDocumentDto.expiresAt
            ? new Date(createDocumentDto.expiresAt)
            : null,
          fileName: `document-${Date.now()}`,
          originalName: `document-${Date.now()}`,
          fileUrl: `/documents/placeholder-${Date.now()}`,
          fileSize: 0,
          mimeType: 'application/octet-stream',
          uploadedById: uploadedById,
          status: 'PENDING',
        },
      });

      return document as Document;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create document');
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    bookingId?: string,
    type?: string,
    verified?: boolean,
  ): Promise<{
    documents: Document[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (bookingId) {
      where.bookingId = bookingId;
    }

    if (type) {
      where.type = type;
    }

    if (verified !== undefined) {
      where.verified = verified;
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      documents,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Document> {
    const document = await this.prisma.document.findUnique({
      where: { id },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findByBooking(bookingId: string): Promise<Document[]> {
    // Validate booking exists
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return this.prisma.document.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    const existingDocument = await this.findOne(id);

    // Validate booking exists if bookingId is being updated
    if (
      updateDocumentDto.bookingId &&
      updateDocumentDto.bookingId !== existingDocument.bookingId
    ) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: updateDocumentDto.bookingId },
      });
      if (!booking) {
        throw new BadRequestException('Booking not found');
      }
    }

    try {
      const updatedDocument = await this.prisma.document.update({
        where: { id },
        data: {
          ...updateDocumentDto,
          updatedAt: new Date(),
        },
      });

      return updatedDocument;
    } catch (error) {
      throw new BadRequestException('Failed to update document');
    }
  }

  async remove(id: string): Promise<Document> {
    const document = await this.findOne(id);

    try {
      const deletedDocument = await this.prisma.document.delete({
        where: { id },
      });

      return deletedDocument;
    } catch (error) {
      throw new BadRequestException('Failed to delete document');
    }
  }

  async verifyDocument(id: string, verifiedBy: string): Promise<Document> {
    const document = await this.findOne(id);

    if (document.status === 'VERIFIED') {
      throw new BadRequestException('Document is already verified');
    }

    try {
      const verifiedDocument = await this.prisma.document.update({
        where: { id },
        data: {
          status: 'VERIFIED',
          verifiedById: verifiedBy,
          verifiedAt: new Date(),
          updatedAt: new Date(),
        },
      });

      return verifiedDocument;
    } catch (error) {
      throw new BadRequestException(
        `Failed to verify document: ${error.message}`,
      );
    }
  }

  async getDocumentStatsByBooking(bookingId?: string): Promise<{
    total: number;
    verified: number;
    pending: number;
    expired: number;
    byType: Record<string, number>;
  }> {
    const where: any = {};
    if (bookingId) {
      where.bookingId = bookingId;
    }

    const [total, verified, pending, expired, byType] = await Promise.all([
      this.prisma.document.count({ where }),
      this.prisma.document.count({ where: { ...where, status: 'VERIFIED' } }),
      this.prisma.document.count({ where: { ...where, status: 'PENDING' } }),
      this.prisma.document.count({
        where: {
          ...where,
          expiresAt: { lt: new Date() },
        },
      }),
      this.prisma.document.groupBy({
        by: ['type'],
        where,
        _count: { type: true },
      }),
    ]);

    const typeStats = byType.reduce(
      (acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      total,
      verified,
      pending,
      expired,
      byType: typeStats,
    };
  }

  async getExpiredDocuments(): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: {
        expiresAt: { lt: new Date() },
      },
      orderBy: { expiresAt: 'asc' },
    });
  }

  async getExpiringDocuments(days: number = 7): Promise<Document[]> {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    return this.prisma.document.findMany({
      where: {
        expiresAt: {
          gte: new Date(),
          lte: expirationDate,
        },
      },
      orderBy: { expiresAt: 'asc' },
    });
  }

  // Additional methods required by the controller
  async createDocument(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
    userId: string,
  ): Promise<Document> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Save file to disk
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadPath, fileName);

    try {
      fs.writeFileSync(filePath, file.buffer);

      const document = await this.prisma.document.create({
        data: {
          type: createDocumentDto.type,
          fileName,
          originalName: file.originalname,
          fileUrl: `/uploads/${fileName}`,
          fileSize: file.size,
          mimeType: file.mimetype,
          uploadedById: userId,
          bookingId: createDocumentDto.bookingId,
          status: 'PENDING',
          metadata: createDocumentDto.metadata,
        },
      });

      return document;
    } catch (error) {
      // Clean up file if database operation fails
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      throw new BadRequestException('Failed to create document');
    }
  }

  async getDocuments(
    userId?: string,
    type?: DocumentType,
    status?: DocumentStatus,
    bookingId?: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ documents: Document[]; total: number }> {
    const where: any = {};

    if (userId) {
      where.uploadedById = userId;
    }
    if (type) {
      where.type = type;
    }
    if (status) {
      where.status = status;
    }
    if (bookingId) {
      where.bookingId = bookingId;
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.document.count({ where }),
    ]);

    return { documents, total };
  }

  async getDocumentById(id: string): Promise<Document> {
    return this.findOne(id);
  }

  async updateDocument(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
    userId: string,
  ): Promise<Document> {
    const document = await this.findOne(id);

    // Check if user has permission to update this document
    if (document.uploadedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this document',
      );
    }

    return this.update(id, updateDocumentDto);
  }

  async deleteDocument(id: string, userId: string): Promise<void> {
    const document = await this.findOne(id);

    // Check if user has permission to delete this document
    if (document.uploadedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this document',
      );
    }

    // Delete file from disk
    const filePath = path.join(this.uploadPath, document.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.remove(id);
  }

  async rejectDocument(
    id: string,
    rejectedById: string,
    reason: string,
    comments?: string,
  ): Promise<Document> {
    const document = await this.findOne(id);

    if (document.status !== 'PENDING') {
      throw new BadRequestException('Only pending documents can be rejected');
    }

    return this.prisma.document.update({
      where: { id },
      data: {
        status: 'REJECTED',
        verifiedById: rejectedById,
        verifiedAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          ...document.metadata,
          rejectionReason: reason,
          rejectionComments: comments,
        },
      },
    });
  }

  async downloadDocument(
    id: string,
    userId: string,
  ): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
    const document = await this.findOne(id);

    // Check if user has permission to download this document
    if (document.uploadedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to download this document',
      );
    }

    const filePath = path.join(this.uploadPath, document.fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Document file not found');
    }

    const buffer = fs.readFileSync(filePath);

    return {
      buffer,
      filename: document.originalName,
      mimeType: document.mimeType,
    };
  }

  async getDocumentsForBooking(
    bookingId: string,
    userId: string,
  ): Promise<Document[]> {
    // Validate user has access to this booking
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { shipper: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Check if user is the shipper or has other permissions
    if (booking.shipper.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view documents for this booking',
      );
    }

    return this.findByBooking(bookingId);
  }

  async getDocumentStats(userId: string): Promise<{
    totalDocuments: number;
    verifiedDocuments: number;
    pendingDocuments: number;
    rejectedDocuments: number;
    expiringDocuments: number;
    documentsByType: Record<string, number>;
  }> {
    const where = { uploadedById: userId };

    const [total, verified, pending, rejected, expiring, byType] =
      await Promise.all([
        this.prisma.document.count({ where }),
        this.prisma.document.count({ where: { ...where, status: 'VERIFIED' } }),
        this.prisma.document.count({ where: { ...where, status: 'PENDING' } }),
        this.prisma.document.count({ where: { ...where, status: 'REJECTED' } }),
        this.prisma.document.count({
          where: {
            ...where,
            expiresAt: {
              gte: new Date(),
              lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            },
          },
        }),
        this.prisma.document.groupBy({
          by: ['type'],
          where,
          _count: { type: true },
        }),
      ]);

    const typeStats = byType.reduce(
      (acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalDocuments: total,
      verifiedDocuments: verified,
      pendingDocuments: pending,
      rejectedDocuments: rejected,
      expiringDocuments: expiring,
      documentsByType: typeStats,
    };
  }

  async searchDocuments(
    query: string,
    userId: string,
    type?: DocumentType,
    status?: DocumentStatus,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ documents: Document[]; total: number }> {
    const where: any = {
      uploadedById: userId,
      OR: [
        { fileName: { contains: query, mode: 'insensitive' } },
        { originalName: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (type) {
      where.type = type;
    }
    if (status) {
      where.status = status;
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.document.count({ where }),
    ]);

    return { documents, total };
  }

  async duplicateDocument(
    id: string,
    userId: string,
    updateData: Partial<CreateDocumentDto>,
  ): Promise<Document> {
    const originalDocument = await this.findOne(id);

    // Check if user has permission to duplicate this document
    if (originalDocument.uploadedById !== userId) {
      throw new ForbiddenException(
        'You do not have permission to duplicate this document',
      );
    }

    // Read the original file
    const originalFilePath = path.join(
      this.uploadPath,
      originalDocument.fileName,
    );
    if (!fs.existsSync(originalFilePath)) {
      throw new NotFoundException('Original document file not found');
    }

    const buffer = fs.readFileSync(originalFilePath);

    // Create new file with timestamp
    const newFileName = `${Date.now()}-copy-${originalDocument.fileName}`;
    const newFilePath = path.join(this.uploadPath, newFileName);

    try {
      fs.writeFileSync(newFilePath, buffer);

      const duplicatedDocument = await this.prisma.document.create({
        data: {
          type: updateData.type || originalDocument.type,
          fileName: newFileName,
          originalName: `copy-${originalDocument.originalName}`,
          fileUrl: `/uploads/${newFileName}`,
          fileSize: originalDocument.fileSize,
          mimeType: originalDocument.mimeType,
          uploadedById: userId,
          bookingId: updateData.bookingId || originalDocument.bookingId,
          status: 'PENDING',
          metadata: updateData.metadata || originalDocument.metadata,
        },
      });

      return duplicatedDocument;
    } catch (error) {
      // Clean up file if database operation fails
      if (fs.existsSync(newFilePath)) {
        fs.unlinkSync(newFilePath);
      }
      throw new BadRequestException('Failed to duplicate document');
    }
  }
}
