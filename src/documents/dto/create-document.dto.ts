import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '@prisma/client';

export { DocumentType } from '@prisma/client';

export enum DocumentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export class CreateDocumentDto {
  @ApiProperty({
    description: 'Document type',
    enum: DocumentType,
  })
  @IsEnum(DocumentType)
  @IsNotEmpty()
  type: DocumentType;

  @ApiProperty({
    description: 'Booking ID associated with this document',
    required: false,
  })
  @IsString()
  @IsOptional()
  bookingId?: string;

  @ApiProperty({
    description: 'Bid ID associated with this document',
    required: false,
  })
  @IsString()
  @IsOptional()
  bidId?: string;

  @ApiProperty({
    description: 'Carrier ID associated with this document',
    required: false,
  })
  @IsString()
  @IsOptional()
  carrierId?: string;

  @ApiProperty({
    description: 'Bill of lading ID associated with this document',
    required: false,
  })
  @IsString()
  @IsOptional()
  billOfLadingId?: string;

  @ApiProperty({
    description: 'Document metadata in JSON format',
    example: { bolNumber: 'BOL123', weight: '1500kg' },
    required: false,
  })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({
    description: 'Document expiration date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  expiresAt?: string;
}
