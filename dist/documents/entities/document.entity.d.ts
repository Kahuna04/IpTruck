import { DocumentType, DocumentStatus } from '@prisma/client';
export declare class Document {
    id: string;
    type: DocumentType;
    status: DocumentStatus;
    fileName: string;
    originalName: string;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    bookingId?: string;
    bidId?: string;
    carrierId?: string;
    uploadedById: string;
    billOfLadingId?: string;
    metadata?: any;
    expiresAt?: Date;
    verifiedAt?: Date;
    verifiedById?: string;
    createdAt: Date;
    updatedAt: Date;
}
