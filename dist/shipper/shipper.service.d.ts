import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '../shared/helper.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { Shipper } from '@prisma/client';
export declare class ShipperService {
    private readonly prisma;
    private readonly helperService;
    private readonly logger;
    constructor(prisma: PrismaService, helperService: HelperService);
    create(createShipperDto: CreateShipperDto): Promise<Shipper>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
                createdAt: Date;
                isActive: boolean;
                isVerified: boolean;
            };
            _count: {
                bookings: number;
            };
        } & {
            description: string | null;
            companyName: string;
            contactPhone: string;
            contactFirstName: string;
            contactLastName: string;
            userId: string;
            registrationNumber: string | null;
            taxId: string | null;
            businessEmail: string;
            phoneNumber: string;
            website: string | null;
            companySize: import(".prisma/client").$Enums.CompanySize;
            street: string;
            city: string;
            state: string;
            postalCode: string;
            countryCode: string;
            contactJobTitle: string;
            contactEmail: string;
            expectedMonthlyVolume: string | null;
            operatingRegions: string | null;
            marketingOptIn: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            nextPage: number | null;
            previousPage: number | null;
        };
    }>;
    findOne(id: string): Promise<Shipper>;
    findByUserId(userId: string): Promise<Shipper | null>;
    update(id: string, updateShipperDto: UpdateShipperDto): Promise<Shipper>;
    remove(id: string): Promise<void>;
    getStatistics(shipperId: string): Promise<{
        totalBookings: number;
        bookingsByStatus: {};
        totalSpent: number;
        currency: string;
    }>;
    search(query: string, page?: number, limit?: number): Promise<{
        data: ({
            user: {
                email: string;
                id: string;
                createdAt: Date;
                isActive: boolean;
                isVerified: boolean;
            };
        } & {
            description: string | null;
            companyName: string;
            contactPhone: string;
            contactFirstName: string;
            contactLastName: string;
            userId: string;
            registrationNumber: string | null;
            taxId: string | null;
            businessEmail: string;
            phoneNumber: string;
            website: string | null;
            companySize: import(".prisma/client").$Enums.CompanySize;
            street: string;
            city: string;
            state: string;
            postalCode: string;
            countryCode: string;
            contactJobTitle: string;
            contactEmail: string;
            expectedMonthlyVolume: string | null;
            operatingRegions: string | null;
            marketingOptIn: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            nextPage: number | null;
            previousPage: number | null;
        };
    }>;
}
