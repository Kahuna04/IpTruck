import { DocumentType } from '@prisma/client';
export { DocumentType } from '@prisma/client';
export declare enum DocumentStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
    EXPIRED = "EXPIRED"
}
export declare class CreateDocumentDto {
    type: DocumentType;
    bookingId?: string;
    bidId?: string;
    carrierId?: string;
    billOfLadingId?: string;
    metadata?: Record<string, any>;
    expiresAt?: string;
}
