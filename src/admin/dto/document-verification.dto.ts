import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class DocumentVerificationDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['approved', 'rejected'])
  status: 'approved' | 'rejected';

  @IsOptional()
  @IsString()
  notes?: string;
}
