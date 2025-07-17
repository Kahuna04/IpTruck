"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const fs = require("fs");
const path = require("path");
let DocumentsService = class DocumentsService {
    prisma;
    uploadPath = process.env.UPLOAD_PATH || './uploads';
    constructor(prisma) {
        this.prisma = prisma;
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }
    async create(createDocumentDto, uploadedById) {
        try {
            if (createDocumentDto.bookingId) {
                const booking = await this.prisma.booking.findUnique({
                    where: { id: createDocumentDto.bookingId },
                });
                if (!booking) {
                    throw new common_1.BadRequestException('Booking not found');
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
            return document;
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to create document');
        }
    }
    async findAll(page = 1, limit = 10, bookingId, type, verified) {
        const skip = (page - 1) * limit;
        const where = {};
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
    async findOne(id) {
        const document = await this.prisma.document.findUnique({
            where: { id },
        });
        if (!document) {
            throw new common_1.NotFoundException('Document not found');
        }
        return document;
    }
    async findByBooking(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return this.prisma.document.findMany({
            where: { bookingId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, updateDocumentDto) {
        const existingDocument = await this.findOne(id);
        if (updateDocumentDto.bookingId &&
            updateDocumentDto.bookingId !== existingDocument.bookingId) {
            const booking = await this.prisma.booking.findUnique({
                where: { id: updateDocumentDto.bookingId },
            });
            if (!booking) {
                throw new common_1.BadRequestException('Booking not found');
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
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to update document');
        }
    }
    async remove(id) {
        const document = await this.findOne(id);
        try {
            const deletedDocument = await this.prisma.document.delete({
                where: { id },
            });
            return deletedDocument;
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to delete document');
        }
    }
    async verifyDocument(id, verifiedBy) {
        const document = await this.findOne(id);
        if (document.status === 'VERIFIED') {
            throw new common_1.BadRequestException('Document is already verified');
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
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to verify document: ${error.message}`);
        }
    }
    async getDocumentStatsByBooking(bookingId) {
        const where = {};
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
        const typeStats = byType.reduce((acc, item) => {
            acc[item.type] = item._count.type;
            return acc;
        }, {});
        return {
            total,
            verified,
            pending,
            expired,
            byType: typeStats,
        };
    }
    async getExpiredDocuments() {
        return this.prisma.document.findMany({
            where: {
                expiresAt: { lt: new Date() },
            },
            orderBy: { expiresAt: 'asc' },
        });
    }
    async getExpiringDocuments(days = 7) {
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
    async createDocument(createDocumentDto, file, userId) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
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
        }
        catch (error) {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw new common_1.BadRequestException('Failed to create document');
        }
    }
    async getDocuments(userId, type, status, bookingId, limit = 20, offset = 0) {
        const where = {};
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
    async getDocumentById(id) {
        return this.findOne(id);
    }
    async updateDocument(id, updateDocumentDto, userId) {
        const document = await this.findOne(id);
        if (document.uploadedById !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this document');
        }
        return this.update(id, updateDocumentDto);
    }
    async deleteDocument(id, userId) {
        const document = await this.findOne(id);
        if (document.uploadedById !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to delete this document');
        }
        const filePath = path.join(this.uploadPath, document.fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await this.remove(id);
    }
    async rejectDocument(id, rejectedById, reason, comments) {
        const document = await this.findOne(id);
        if (document.status !== 'PENDING') {
            throw new common_1.BadRequestException('Only pending documents can be rejected');
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
    async downloadDocument(id, userId) {
        const document = await this.findOne(id);
        if (document.uploadedById !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to download this document');
        }
        const filePath = path.join(this.uploadPath, document.fileName);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException('Document file not found');
        }
        const buffer = fs.readFileSync(filePath);
        return {
            buffer,
            filename: document.originalName,
            mimeType: document.mimeType,
        };
    }
    async getDocumentsForBooking(bookingId, userId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { shipper: true },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.shipper.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view documents for this booking');
        }
        return this.findByBooking(bookingId);
    }
    async getDocumentStats(userId) {
        const where = { uploadedById: userId };
        const [total, verified, pending, rejected, expiring, byType] = await Promise.all([
            this.prisma.document.count({ where }),
            this.prisma.document.count({ where: { ...where, status: 'VERIFIED' } }),
            this.prisma.document.count({ where: { ...where, status: 'PENDING' } }),
            this.prisma.document.count({ where: { ...where, status: 'REJECTED' } }),
            this.prisma.document.count({
                where: {
                    ...where,
                    expiresAt: {
                        gte: new Date(),
                        lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    },
                },
            }),
            this.prisma.document.groupBy({
                by: ['type'],
                where,
                _count: { type: true },
            }),
        ]);
        const typeStats = byType.reduce((acc, item) => {
            acc[item.type] = item._count.type;
            return acc;
        }, {});
        return {
            totalDocuments: total,
            verifiedDocuments: verified,
            pendingDocuments: pending,
            rejectedDocuments: rejected,
            expiringDocuments: expiring,
            documentsByType: typeStats,
        };
    }
    async searchDocuments(query, userId, type, status, limit = 20, offset = 0) {
        const where = {
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
    async duplicateDocument(id, userId, updateData) {
        const originalDocument = await this.findOne(id);
        if (originalDocument.uploadedById !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to duplicate this document');
        }
        const originalFilePath = path.join(this.uploadPath, originalDocument.fileName);
        if (!fs.existsSync(originalFilePath)) {
            throw new common_1.NotFoundException('Original document file not found');
        }
        const buffer = fs.readFileSync(originalFilePath);
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
        }
        catch (error) {
            if (fs.existsSync(newFilePath)) {
                fs.unlinkSync(newFilePath);
            }
            throw new common_1.BadRequestException('Failed to duplicate document');
        }
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map