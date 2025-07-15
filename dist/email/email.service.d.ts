import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export interface PasswordRecoveryData {
    email: string;
    name: string;
    resetToken: string;
}
export interface CompanyData {
    companyName: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    businessEmail: string;
    phoneNumber: string;
    companyType: string;
}
export interface BookingData {
    bookingId: string;
    referenceNumber?: string;
    description: string;
    pickupLocation: {
        address: string;
        city: string;
        state: string;
    };
    deliveryLocation: {
        address: string;
        city: string;
        state: string;
    };
    preferredPickupTime: string;
    proposedPrice: number;
    contactPerson: string;
    contactPhone: string;
    cargoType: string;
    weight: number;
    urgencyLevel: string;
}
export interface BidData {
    bidId: string;
    bookingId: string;
    bidAmount: number;
    proposedPickupTime: string;
    estimatedDeliveryTime: string;
    truckDetails: {
        makeModel: string;
        year: number;
        licensePlate: string;
        maxPayload: number;
    };
    driverDetails: {
        fullName: string;
        contactPhone: string;
        experienceYears: number;
    };
    contactPerson: string;
    message?: string;
    companyName: string;
}
export interface BidAcceptanceData {
    bidId: string;
    bookingId: string;
    finalAmount: number;
    pickupTime: string;
    deliveryTime: string;
    shipperCompany: string;
    carrierCompany: string;
    contactDetails: {
        shipperContact: string;
        shipperPhone: string;
        carrierContact: string;
        carrierPhone: string;
    };
}
export declare class EmailService {
    private readonly mailService;
    private readonly config;
    constructor(mailService: MailerService, config: ConfigService);
    private getBaseUrl;
    sendCompanyWelcomeEmail(companyData: CompanyData, token: string): Promise<void>;
    sendAccountActivationEmail(companyData: CompanyData, activationCode: string): Promise<void>;
    sendAccountActivationSuccessEmail(companyData: CompanyData): Promise<void>;
    sendPasswordRecoveryEmail(data: PasswordRecoveryData): Promise<void>;
    sendNewBookingNotification(carrierEmails: string[], bookingData: BookingData): Promise<void>;
    sendBidReceivedNotification(shipperEmail: string, bidData: BidData): Promise<void>;
    sendBidAcceptedNotification(carrierEmail: string, acceptanceData: BidAcceptanceData): Promise<void>;
    sendBidRejectedNotification(carrierEmail: string, bidData: BidData, reason?: string): Promise<void>;
    sendBookingConfirmation(emails: string[], acceptanceData: BidAcceptanceData): Promise<void>;
    sendBookingReminder(email: string, bookingData: BookingData, reminderType: 'pickup' | 'delivery'): Promise<void>;
    sendBidNotification(bid: any): Promise<void>;
}
