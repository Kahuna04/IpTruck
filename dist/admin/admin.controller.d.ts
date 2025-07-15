import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentVerificationDto } from './dto/document-verification.dto';
import { User, Document, Bid } from '@prisma/client';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    createAdmin(createAdminDto: CreateAdminDto): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    suspendUser(id: string): Promise<User>;
    activateUser(id: string): Promise<User>;
    getAllDocuments(): Promise<Document[]>;
    getPendingDocuments(): Promise<Document[]>;
    verifyDocument(id: string, verificationDto: DocumentVerificationDto): Promise<Document>;
    deleteDocument(id: string): Promise<{
        message: string;
    }>;
    getAllBids(): Promise<Bid[]>;
    getBidById(id: string): Promise<Bid>;
    deleteBid(id: string): Promise<{
        message: string;
    }>;
    getDashboardStats(): Promise<any>;
    getUsersRegisteredInDateRange(startDate: string, endDate: string): Promise<User[]>;
    getRecentActivity(): Promise<any>;
}
