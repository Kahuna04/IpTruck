import { ApiProperty } from '@nestjs/swagger';
import { DocumentType, DocumentStatus } from '@prisma/client';

export class Document {
  @ApiProperty({ description: 'Document ID' })
  id: string;

  @ApiProperty({ description: 'Document type', enum: DocumentType })
  type: DocumentType;

  @ApiProperty({ description: 'Document status', enum: DocumentStatus })
  status: DocumentStatus;

  @ApiProperty({ description: 'File name' })
  fileName: string;

  @ApiProperty({ description: 'Original file name' })
  originalName: string;

  @ApiProperty({ description: 'File URL' })
  fileUrl: string;

  @ApiProperty({ description: 'File size in bytes' })
  fileSize: number;

  @ApiProperty({ description: 'MIME type' })
  mimeType: string;

  @ApiProperty({ description: 'Associated booking ID', required: false })
  bookingId?: string | null;

  @ApiProperty({ description: 'Associated bid ID', required: false })
  bidId?: string | null;

  @ApiProperty({ description: 'Associated carrier ID', required: false })
  carrierId?: string | null;

  @ApiProperty({ description: 'Uploaded by user ID' })
  uploadedById: string;

  @ApiProperty({ description: 'Bill of lading ID', required: false })
  billOfLadingId?: string | null;

  @ApiProperty({ description: 'Document metadata', required: false })
  metadata?: any;

  @ApiProperty({ description: 'Document expiration date', required: false })
  expiresAt?: Date | null;

  @ApiProperty({ description: 'Document verification date', required: false })
  verifiedAt?: Date | null;

  @ApiProperty({ description: 'Verified by user ID', required: false })
  verifiedById?: string | null;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Update timestamp' })
  updatedAt: Date;
}
