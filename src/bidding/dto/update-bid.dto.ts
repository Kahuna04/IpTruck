import { PartialType } from '@nestjs/swagger';
import { CreateBidDto } from './create-bid.dto';
import { BidStatus } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  MaxLength,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBidDto extends PartialType(CreateBidDto) {
  @ApiProperty({
    example: BidStatus.ACCEPTED,
    description: 'Updated bid status',
    enum: BidStatus,
  })
  @IsOptional()
  @IsEnum(BidStatus)
  status?: BidStatus;

  @ApiProperty({
    example: 'Updated proposal with better terms',
    description: 'Updated message or proposal details',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @ApiProperty({
    example: 150000,
    description: 'Updated bid amount',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1000)
  bidAmount?: number;

  @ApiProperty({
    example: '2024-07-16T08:00:00Z',
    description: 'Updated proposed pickup time',
  })
  @IsOptional()
  @IsDateString()
  proposedPickupTime?: string;

  @ApiProperty({
    example: '2024-07-16T16:00:00Z',
    description: 'Updated estimated delivery time',
  })
  @IsOptional()
  @IsDateString()
  estimatedDeliveryTime?: string;

  @ApiProperty({
    example: 'Counter-offer: Can do it for 140k with same terms',
    description: 'Response message from shipper',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  responseMessage?: string;

  @ApiProperty({
    example: '2024-07-17T23:59:59Z',
    description: 'Updated bid expiration time',
  })
  @IsOptional()
  @IsDateString()
  bidExpiresAt?: string;

  @ApiProperty({
    example: 'Payment terms updated to 50% upfront',
    description: 'Updated payment terms',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  paymentTerms?: string;

  @ApiProperty({
    example: 'Updated special terms and conditions',
    description: 'Updated special terms',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  specialTerms?: string;
}
