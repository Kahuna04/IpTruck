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
    bookingId?: string | null;
    bidId?: string | null;
    carrierId?: string | null;
    uploadedById: string;
    billOfLadingId?: string | null;
    metadata?: any;
    expiresAt?: Date | null;
    verifiedAt?: Date | null;
    verifiedById?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
