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
export interface DeliveryNotificationData {
    bookingId: string;
    trackingNumber: string;
    status: 'picked_up' | 'in_transit' | 'delivered';
    location: string;
    timestamp: string;
    driverName: string;
    driverPhone: string;
    shipperCompany: string;
    carrierCompany: string;
    estimatedDeliveryTime?: string;
    deliveryProof?: string;
}
export interface DocumentVerificationData {
    documentId: string;
    documentType: string;
    fileName: string;
    status: 'verified' | 'rejected';
    companyName: string;
    contactName: string;
    reason?: string;
    verifiedBy?: string;
    verifiedAt?: string;
}
export interface PaymentNotificationData {
    bookingId: string;
    paymentId: string;
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: string;
    shipperCompany: string;
    carrierCompany: string;
    dueDate?: string;
    invoiceUrl?: string;
}
export interface MaintenanceNotificationData {
    maintenanceType: 'scheduled' | 'emergency';
    startTime: string;
    endTime: string;
    affectedServices: string[];
    description: string;
    alternativeActions?: string[];
}
export interface ReviewReminderData {
    bookingId: string;
    companyName: string;
    partnerCompany: string;
    deliveryDate: string;
    userType: 'shipper' | 'carrier';
    reviewUrl: string;
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
    sendDeliveryNotification(email: string, deliveryData: DeliveryNotificationData): Promise<void>;
    sendDocumentVerificationNotification(email: string, documentData: DocumentVerificationData): Promise<void>;
    sendPaymentNotification(email: string, paymentData: PaymentNotificationData): Promise<void>;
    sendMaintenanceNotification(emails: string[], maintenanceData: MaintenanceNotificationData): Promise<void>;
    sendReviewReminder(email: string, reviewData: ReviewReminderData): Promise<void>;
    sendBulkNotifications(emails: string[], subject: string, templateName: string, context: any): Promise<void>;
    sendAdminNotification(adminEmails: string[], subject: string, message: string, data?: any): Promise<void>;
    sendTestEmail(to: string): Promise<void>;
}
