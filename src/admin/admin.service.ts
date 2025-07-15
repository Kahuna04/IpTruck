import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentVerificationDto } from './dto/document-verification.dto';
import { User, Document, Bid } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
  ) {}

  // User Management
  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: {
        documentsUploaded: true,
        shipper: true,
        carrier: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        documentsUploaded: true,
        shipper: true,
        carrier: true,
      },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return user;
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    const { email, password } = createAdminDto;
    
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ForbiddenException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const admin = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        userType: 'ADMIN',
        isVerified: true,
        isActive: true,
      },
    });

    return admin;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    
    // Prepare update data
    const updateData: any = { ...updateUserDto };
    
    // Hash password if provided
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(updateUserDto.password, saltRounds);
    }
    
    return await this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    
    // Prevent deleting admin users
    if (user.userType === 'ADMIN') {
      throw new ForbiddenException('Cannot delete admin users');
    }
    
    await this.prisma.user.delete({ where: { id } });
  }

  async suspendUser(id: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async activateUser(id: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });
  }

  // Document Management
  async getAllDocuments(): Promise<Document[]> {
    return await this.prisma.document.findMany({
      include: {
        uploadedBy: true,
        verifiedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPendingDocuments(): Promise<Document[]> {
    return await this.prisma.document.findMany({
      where: { status: 'PENDING' },
      include: {
        uploadedBy: true,
        verifiedBy: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async verifyDocument(id: string, verificationDto: DocumentVerificationDto): Promise<Document> {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        uploadedBy: true,
      },
    });
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    
    // Update document status
    const updatedDocument = await this.prisma.document.update({
      where: { id },
      data: {
        status: verificationDto.status === 'approved' ? 'VERIFIED' : 'REJECTED',
        // verificationNotes: verificationDto.notes, // Field not in schema
        verifiedAt: new Date(),
      },
    });
    
    // Update user verification status if document is approved
    if (verificationDto.status === 'approved') {
      await this.prisma.user.update({
        where: { id: document.uploadedById },
        data: { isVerified: true },
      });
    }
    
    return updatedDocument;
  }

  async deleteDocument(id: string): Promise<void> {
    const document = await this.prisma.document.findUnique({ where: { id } });
    
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    
    await this.prisma.document.delete({ where: { id } });
  }

  // Bid Management
  async getAllBids(): Promise<Bid[]> {
    return await this.prisma.bid.findMany({
      include: {
        carrier: true,
        booking: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getBidById(id: string): Promise<Bid> {
    const bid = await this.prisma.bid.findUnique({
      where: { id },
      include: {
        carrier: true,
        booking: true,
      },
    });
    
    if (!bid) {
      throw new NotFoundException(`Bid with ID ${id} not found`);
    }
    
    return bid;
  }

  async deleteBid(id: string): Promise<void> {
    const bid = await this.getBidById(id);
    await this.prisma.bid.delete({ where: { id } });
  }

  // Analytics and Reports
  async getDashboardStats(): Promise<any> {
    const [
      totalUsers,
      activeUsers,
      pendingDocuments,
      totalBids,
      verifiedUsers,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { isActive: true } }),
      this.prisma.document.count({ where: { status: 'PENDING' } }),
      this.prisma.bid.count(),
      this.prisma.user.count({ where: { isVerified: true } }),
    ]);

    return {
      totalUsers,
      activeUsers,
      pendingDocuments,
      totalBids,
      verifiedUsers,
      userVerificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
    };
  }

  async getUsersRegisteredInDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecentActivity(): Promise<any> {
    const [recentUsers, recentDocuments, recentBids] = await Promise.all([
      this.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.document.findMany({
        include: {
          uploadedBy: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      this.prisma.bid.findMany({
        include: {
          carrier: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    return {
      recentUsers,
      recentDocuments,
      recentBids,
    };
  }
}
