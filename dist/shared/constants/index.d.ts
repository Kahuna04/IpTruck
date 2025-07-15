import { UserType, CompanySize, UrgencyLevel, BookingStatus, BidStatus, DocumentType, DocumentStatus, UserRole } from '@prisma/client';
export { UserType, CompanySize, UrgencyLevel, BookingStatus, BidStatus, DocumentType, DocumentStatus, UserRole };
export interface User {
    id: string;
    email: string;
    password: string;
    userType: UserType;
    isActive: boolean;
    isVerified: boolean;
    resetPasswordToken?: string;
    refreshToken?: string;
    lat?: number;
    lng?: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface JwtPayload {
    sub: string;
    email: string;
    userType: UserType;
    iat?: number;
    exp?: number;
}
export interface Tokens {
    accessToken: string;
    refreshToken: string;
}
export interface ResponseWrapper<T> {
    status: number;
    message: string;
    data: T;
}
export interface LocationData {
    locationName?: string;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
    countryCode: string;
    latitude?: number;
    longitude?: number;
    specialInstructions?: string;
    contactPerson?: string;
    contactPhone?: string;
}
export interface CargoDetails {
    description: string;
    type: string;
    weight: number;
    volume?: number;
    length?: number;
    width?: number;
    height?: number;
    quantity?: number;
    unit?: string;
    declaredValue?: number;
    requiresRefrigeration?: boolean;
    requiredTemperature?: number;
    isFragile?: boolean;
    isHazardous?: boolean;
    hazardousClass?: string;
    specialHandling?: string;
}
export interface TruckDetails {
    makeModel: string;
    year: number;
    licensePlate: string;
    maxPayload: number;
    cargoVolume?: number;
    condition: string;
    mileage?: number;
    equipment?: string[];
    availableServices?: string[];
    photoUrl?: string;
    insuranceNumber?: string;
    insuranceExpiryDate?: string;
}
export interface DriverDetails {
    fullName: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    experienceYears: number;
    contactPhone: string;
    rating?: number;
    completedTrips?: number;
    certifications?: string[];
}
export declare const TRUCK_TYPES: readonly ["FLATBED", "VAN", "REFRIGERATED", "TANKER", "CONTAINER", "DUMP", "HEAVY_HAUL", "PICKUP", "BOX_TRUCK", "TRACTOR_TRAILER"];
export declare const URGENCY_LEVELS: readonly ["LOW", "MEDIUM", "HIGH", "URGENT"];
export declare const CARGO_TYPES: readonly ["GENERAL", "PERISHABLE", "HAZARDOUS", "FRAGILE", "OVERSIZED", "LIQUID", "BULK", "CONSTRUCTION", "AUTOMOTIVE", "ELECTRONICS"];
export declare const NIGERIAN_STATES: readonly ["ABIA", "ADAMAWA", "AKWA_IBOM", "ANAMBRA", "BAUCHI", "BAYELSA", "BENUE", "BORNO", "CROSS_RIVER", "DELTA", "EBONYI", "EDO", "EKITI", "ENUGU", "FCT", "GOMBE", "IMO", "JIGAWA", "KADUNA", "KANO", "KATSINA", "KEBBI", "KOGI", "KWARA", "LAGOS", "NASARAWA", "NIGER", "OGUN", "ONDO", "OSUN", "OYO", "PLATEAU", "RIVERS", "SOKOTO", "TARABA", "YOBE", "ZAMFARA"];
export declare const DEFAULT_PAGINATION: {
    readonly page: 1;
    readonly limit: 20;
    readonly maxLimit: 100;
};
export declare const EMAIL_TEMPLATES: {
    readonly SHIPPER_WELCOME: "shipperWelcome";
    readonly CARRIER_WELCOME: "carrierWelcome";
    readonly ACCOUNT_VERIFICATION: "accountVerification";
    readonly PASSWORD_RESET: "passwordReset";
    readonly NEW_BOOKING_NOTIFICATION: "newBookingNotification";
    readonly BID_RECEIVED: "bidReceived";
    readonly BID_ACCEPTED: "bidAccepted";
    readonly BID_REJECTED: "bidRejected";
    readonly BOOKING_CONFIRMATION: "bookingConfirmation";
    readonly BOOKING_REMINDER: "bookingReminder";
};
export declare const API_RESPONSE_MESSAGES: {
    readonly SUCCESS: "Operation completed successfully";
    readonly CREATED: "Resource created successfully";
    readonly UPDATED: "Resource updated successfully";
    readonly DELETED: "Resource deleted successfully";
    readonly NOT_FOUND: "Resource not found";
    readonly UNAUTHORIZED: "Unauthorized access";
    readonly FORBIDDEN: "Access forbidden";
    readonly VALIDATION_ERROR: "Validation failed";
    readonly SERVER_ERROR: "Internal server error";
    readonly CONFLICT: "Resource already exists";
};
