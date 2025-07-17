import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'abc123def456',
    description: 'Password reset token received via email',
  })
  @IsNotEmpty()
  @IsString()
  resetToken: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description: 'New password (minimum 8 characters)',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description: 'Confirm new password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  confirmPassword: string;
}
