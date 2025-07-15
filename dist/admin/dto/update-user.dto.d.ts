import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    role?: UserRole;
    isActive?: boolean;
}
