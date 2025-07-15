import { BidStatus } from '@prisma/client';
export { BidStatus };
export { UpdateBidDto } from './update-bid.dto';
export declare enum TruckCondition {
    NEW = "new",
    EXCELLENT = "excellent",
    GOOD = "good",
    FAIR = "fair",
    POOR = "poor"
}
export declare class TruckDetailsDto {
    [key: string]: any;
    makeModel: string;
    year: number;
    licensePlate: string;
    maxPayload: number;
    cargoVolume?: number;
    condition: TruckCondition;
    mileage?: number;
    equipment?: string;
    availableServices?: string[];
    photoUrl?: string;
    insuranceNumber?: string;
    insuranceExpiryDate?: string;
}
export declare class DriverDetailsDto {
    [key: string]: any;
    fullName: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    experienceYears: number;
    contactPhone: string;
    rating?: number;
    completedTrips?: number;
    certifications?: string[];
}
export declare class CreateBidDto {
    bookingId: string;
    carrierId: string;
    bidAmount: number;
    currency?: string;
    proposedPickupTime: string;
    estimatedDeliveryTime: string;
    truckDetails: TruckDetailsDto;
    driverDetails: DriverDetailsDto;
    message?: string;
    includedServices?: string[];
    bidExpiresAt?: string;
    isNegotiable?: boolean;
    paymentTerms?: string;
    specialTerms?: string;
    minimumAcceptablePrice?: number;
    documentationUrl?: string;
    contactPerson: string;
    contactPhone: string;
    contactEmail?: string;
}
export declare class BidResponseDto {
    status: BidStatus;
    message?: string;
    counterOfferAmount?: number;
}
