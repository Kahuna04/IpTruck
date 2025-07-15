import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { DocumentType, DocumentStatus } from './dto/create-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    uploadDocument(file: Express.Multer.File, createDocumentDto: CreateDocumentDto, user: any): Promise<Document>;
    getDocuments(type?: DocumentType, status?: DocumentStatus, bookingId?: string, myDocuments?: boolean, limit?: number, offset?: number, user: any): Promise<{
        documents: Document[];
        total: number;
    }>;
    getDocumentById(id: string): Promise<Document>;
    updateDocument(id: string, updateDocumentDto: UpdateDocumentDto, user: any): Promise<Document>;
    deleteDocument(id: string, user: any): Promise<void>;
    verifyDocument(id: string, body: {
        comments?: string;
    }, user: any): Promise<Document>;
    rejectDocument(id: string, body: {
        reason: string;
        comments?: string;
    }, user: any): Promise<Document>;
    downloadDocument(id: string, user: any): Promise<{
        buffer: Buffer;
        filename: string;
        mimeType: string;
    }>;
    getDocumentsForBooking(bookingId: string, user: any): Promise<Document[]>;
    getExpiringDocuments(days?: number, user: any): Promise<Document[]>;
    getDocumentStats(user: any): Promise<{
        totalDocuments: number;
        verifiedDocuments: number;
        pendingDocuments: number;
        rejectedDocuments: number;
        expiringDocuments: number;
        documentsByType: Record<string, number>;
    }>;
    searchDocuments(query: string, type?: DocumentType, status?: DocumentStatus, limit?: number, offset?: number, user: any): Promise<{
        documents: Document[];
        total: number;
    }>;
    duplicateDocument(id: string, updateData: Partial<CreateDocumentDto>, user: any): Promise<Document>;
}
