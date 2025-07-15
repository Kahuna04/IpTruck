export declare class CreateTruckDto {
    makeModel: string;
    year: number;
    licensePlate: string;
    maxPayload: number;
    cargoVolume?: number;
    truckType: string;
    condition: string;
    mileage?: number;
    equipment?: string[];
    availableServices?: string[];
    photoUrl?: string;
    insuranceNumber?: string;
    insuranceExpiryDate?: string;
    driverName?: string;
    driverLicenseNumber?: string;
    driverLicenseExpiry?: string;
    driverExperience?: number;
    driverPhone?: string;
    driverRating?: number;
    isActive?: boolean;
}
