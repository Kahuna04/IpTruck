import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '../shared/helper.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Carrier, Truck } from '@prisma/client';
export declare class CarrierService {
    private readonly prisma;
    private readonly helperService;
    private readonly logger;
    constructor(prisma: PrismaService, helperService: HelperService);
    create(createCarrierDto: CreateCarrierDto): Promise<Carrier>;
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
                bids: number;
                trucks: number;
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
            operatingRegions: string | null;
            marketingOptIn: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
            fleetSize: string | null;
            rating: number | null;
            completedJobs: number;
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
    findOne(id: string): Promise<Carrier>;
    findByUserId(userId: string): Promise<Carrier | null>;
    update(id: string, updateCarrierDto: UpdateCarrierDto): Promise<Carrier>;
    remove(id: string): Promise<void>;
    getStatistics(carrierId: string): Promise<{
        rating: number | null;
        completedJobs: number;
        totalTrucks: number;
        totalBids: number;
        bidsByStatus: {};
        totalEarnings: number;
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
            _count: {
                bids: number;
                trucks: number;
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
            operatingRegions: string | null;
            marketingOptIn: boolean;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isVerified: boolean;
            fleetSize: string | null;
            rating: number | null;
            completedJobs: number;
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
    addTruck(carrierId: string, createTruckDto: CreateTruckDto): Promise<Truck>;
    getTrucks(carrierId: string): Promise<Truck[]>;
    getTruckById(truckId: string): Promise<Truck>;
    updateTruck(truckId: string, updateTruckDto: UpdateTruckDto): Promise<Truck>;
    removeTruck(truckId: string): Promise<void>;
    updateRating(carrierId: string, newRating: number): Promise<Carrier>;
    incrementCompletedJobs(carrierId: string): Promise<Carrier>;
}
