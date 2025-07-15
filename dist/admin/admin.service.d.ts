import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentVerificationDto } from './dto/document-verification.dto';
import { User, Document, Bid } from '@prisma/client';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<void>;
    suspendUser(id: string): Promise<User>;
    activateUser(id: string): Promise<User>;
    getAllDocuments(): Promise<Document[]>;
    getPendingDocuments(): Promise<Document[]>;
    verifyDocument(id: string, verificationDto: DocumentVerificationDto): Promise<Document>;
    deleteDocument(id: string): Promise<void>;
    getAllBids(): Promise<Bid[]>;
    getBidById(id: string): Promise<Bid>;
    deleteBid(id: string): Promise<void>;
    getDashboardStats(): Promise<any>;
    getUsersRegisteredInDateRange(startDate: Date, endDate: Date): Promise<User[]>;
    getRecentActivity(): Promise<any>;
}
