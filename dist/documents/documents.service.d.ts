import { PrismaService } from '../prisma/prisma.service';
import { CreateDocumentDto, DocumentType, DocumentStatus } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
export declare class DocumentsService {
    private prisma;
    private readonly uploadPath;
    constructor(prisma: PrismaService);
    create(createDocumentDto: CreateDocumentDto): Promise<Document>;
    findAll(page?: number, limit?: number, bookingId?: string, type?: string, verified?: boolean): Promise<{
        documents: Document[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Document>;
    findByBooking(bookingId: string): Promise<Document[]>;
    update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document>;
    remove(id: string): Promise<Document>;
    getDocumentStatsByBooking(bookingId?: string): Promise<{
        total: number;
        verified: number;
        pending: number;
        expired: number;
        byType: Record<string, number>;
    }>;
    getExpiredDocuments(): Promise<Document[]>;
    createDocument(createDocumentDto: CreateDocumentDto, file: Express.Multer.File, userId: string): Promise<Document>;
    getDocuments(userId?: string, type?: DocumentType, status?: DocumentStatus, bookingId?: string, limit?: number, offset?: number): Promise<{
        documents: Document[];
        total: number;
    }>;
    getDocumentById(id: string): Promise<Document>;
    updateDocument(id: string, updateDocumentDto: UpdateDocumentDto, userId: string): Promise<Document>;
    deleteDocument(id: string, userId: string): Promise<void>;
    rejectDocument(id: string, rejectedById: string, reason: string, comments?: string): Promise<Document>;
    downloadDocument(id: string, userId: string): Promise<{
        buffer: Buffer;
        filename: string;
        mimeType: string;
    }>;
    getDocumentsForBooking(bookingId: string, userId: string): Promise<Document[]>;
    getDocumentStats(userId: string): Promise<{
        totalDocuments: number;
        verifiedDocuments: number;
        pendingDocuments: number;
        rejectedDocuments: number;
        expiringDocuments: number;
        documentsByType: Record<string, number>;
    }>;
    searchDocuments(query: string, userId: string, type?: DocumentType, status?: DocumentStatus, limit?: number, offset?: number): Promise<{
        documents: Document[];
        total: number;
    }>;
    duplicateDocument(id: string, userId: string, updateData: Partial<CreateDocumentDto>): Promise<Document>;
}
