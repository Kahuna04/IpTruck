"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    mailService;
    config;
    constructor(mailService, config) {
        this.mailService = mailService;
        this.config = config;
    }
    getBaseUrl() {
        return this.config.get('BASE_URL') || 'https://iptruck.com';
    }
    async sendCompanyWelcomeEmail(companyData, token) {
        const confirmationUrl = `${this.getBaseUrl()}/auth/confirm?token=${token}`;
        await this.mailService.sendMail({
            to: companyData.businessEmail,
            from: this.config.get('USER_GMAIL'),
            subject: 'Welcome to IpTruck! Confirm your Company Registration',
            template: './companyWelcome',
            context: {
                companyName: companyData.companyName,
                contactName: `${companyData.contactFirstName} ${companyData.contactLastName}`,
                companyType: companyData.companyType,
                confirmationUrl,
            },
        });
    }
    async sendAccountActivationEmail(companyData, activationCode) {
        const activationUrl = `${this.getBaseUrl()}/auth/activate/${activationCode}`;
        await this.mailService.sendMail({
            to: companyData.businessEmail,
            from: this.config.get('USER_GMAIL'),
            subject: 'IpTruck Account Activation Required',
            template: './accountActivation',
            context: {
                companyName: companyData.companyName,
                contactName: `${companyData.contactFirstName} ${companyData.contactLastName}`,
                activationUrl,
                activationCode,
            },
        });
    }
    async sendAccountActivationSuccessEmail(companyData) {
        const dashboardUrl = `${this.getBaseUrl()}/dashboard`;
        await this.mailService.sendMail({
            to: companyData.businessEmail,
            from: this.config.get('USER_GMAIL'),
            subject: 'IpTruck Account Activated Successfully!',
            template: './accountActivationSuccess',
            context: {
                companyName: companyData.companyName,
                contactName: `${companyData.contactFirstName} ${companyData.contactLastName}`,
                dashboardUrl,
                companyType: companyData.companyType,
            },
        });
    }
    async sendPasswordRecoveryEmail(data) {
        const { email, name, resetToken } = data;
        const resetPasswordUrl = `${this.getBaseUrl()}/auth/reset-password?token=${resetToken}`;
        await this.mailService.sendMail({
            to: email,
            from: this.config.get('USER_GMAIL'),
            subject: 'IpTruck Password Recovery',
            template: './forgotPassword',
            context: {
                name: name,
                resetPasswordUrl,
            },
        });
    }
    async sendNewBookingNotification(carrierEmails, bookingData) {
        const bookingUrl = `${this.getBaseUrl()}/bookings/${bookingData.bookingId}`;
        const emailPromises = carrierEmails.map(email => this.mailService.sendMail({
            to: email,
            from: this.config.get('USER_GMAIL'),
            subject: `New Truck Booking Available - ${bookingData.urgencyLevel.toUpperCase()} Priority`,
            template: './newBookingNotification',
            context: {
                bookingId: bookingData.bookingId,
                referenceNumber: bookingData.referenceNumber,
                description: bookingData.description,
                pickupLocation: `${bookingData.pickupLocation.city}, ${bookingData.pickupLocation.state}`,
                deliveryLocation: `${bookingData.deliveryLocation.city}, ${bookingData.deliveryLocation.state}`,
                preferredPickupTime: new Date(bookingData.preferredPickupTime).toLocaleDateString(),
                proposedPrice: bookingData.proposedPrice.toLocaleString(),
                contactPerson: bookingData.contactPerson,
                contactPhone: bookingData.contactPhone,
                cargoType: bookingData.cargoType,
                weight: bookingData.weight,
                urgencyLevel: bookingData.urgencyLevel,
                bookingUrl,
            },
        }));
        await Promise.all(emailPromises);
    }
    async sendBidReceivedNotification(shipperEmail, bidData) {
        const bidUrl = `${this.getBaseUrl()}/bookings/${bidData.bookingId}/bids/${bidData.bidId}`;
        await this.mailService.sendMail({
            to: shipperEmail,
            from: this.config.get('USER_GMAIL'),
            subject: `New Bid Received for Booking #${bidData.bookingId}`,
            template: './bidReceived',
            context: {
                bidId: bidData.bidId,
                bookingId: bidData.bookingId,
                bidAmount: bidData.bidAmount.toLocaleString(),
                proposedPickupTime: new Date(bidData.proposedPickupTime).toLocaleDateString(),
                estimatedDeliveryTime: new Date(bidData.estimatedDeliveryTime).toLocaleDateString(),
                truckMakeModel: bidData.truckDetails.makeModel,
                truckYear: bidData.truckDetails.year,
                truckLicensePlate: bidData.truckDetails.licensePlate,
                maxPayload: bidData.truckDetails.maxPayload,
                driverName: bidData.driverDetails.fullName,
                driverPhone: bidData.driverDetails.contactPhone,
                driverExperience: bidData.driverDetails.experienceYears,
                carrierCompany: bidData.companyName,
                contactPerson: bidData.contactPerson,
                message: bidData.message,
                bidUrl,
            },
        });
    }
    async sendBidAcceptedNotification(carrierEmail, acceptanceData) {
        const bookingUrl = `${this.getBaseUrl()}/bookings/${acceptanceData.bookingId}`;
        await this.mailService.sendMail({
            to: carrierEmail,
            from: this.config.get('USER_GMAIL'),
            subject: `Congratulations! Your Bid Has Been Accepted`,
            template: './bidAccepted',
            context: {
                bidId: acceptanceData.bidId,
                bookingId: acceptanceData.bookingId,
                finalAmount: acceptanceData.finalAmount.toLocaleString(),
                pickupTime: new Date(acceptanceData.pickupTime).toLocaleDateString(),
                deliveryTime: new Date(acceptanceData.deliveryTime).toLocaleDateString(),
                shipperCompany: acceptanceData.shipperCompany,
                carrierCompany: acceptanceData.carrierCompany,
                shipperContact: acceptanceData.contactDetails.shipperContact,
                shipperPhone: acceptanceData.contactDetails.shipperPhone,
                carrierContact: acceptanceData.contactDetails.carrierContact,
                carrierPhone: acceptanceData.contactDetails.carrierPhone,
                bookingUrl,
            },
        });
    }
    async sendBidRejectedNotification(carrierEmail, bidData, reason) {
        await this.mailService.sendMail({
            to: carrierEmail,
            from: this.config.get('USER_GMAIL'),
            subject: `Bid Update - Booking #${bidData.bookingId}`,
            template: './bidRejected',
            context: {
                bidId: bidData.bidId,
                bookingId: bidData.bookingId,
                carrierCompany: bidData.companyName,
                contactPerson: bidData.contactPerson,
                reason: reason || 'The shipper has selected a different carrier for this booking.',
            },
        });
    }
    async sendBookingConfirmation(emails, acceptanceData) {
        const bookingUrl = `${this.getBaseUrl()}/bookings/${acceptanceData.bookingId}`;
        const emailPromises = emails.map(email => this.mailService.sendMail({
            to: email,
            from: this.config.get('USER_GMAIL'),
            subject: `Booking Confirmed - #${acceptanceData.bookingId}`,
            template: './bookingConfirmation',
            context: {
                bookingId: acceptanceData.bookingId,
                finalAmount: acceptanceData.finalAmount.toLocaleString(),
                pickupTime: new Date(acceptanceData.pickupTime).toLocaleDateString(),
                deliveryTime: new Date(acceptanceData.deliveryTime).toLocaleDateString(),
                shipperCompany: acceptanceData.shipperCompany,
                carrierCompany: acceptanceData.carrierCompany,
                shipperContact: acceptanceData.contactDetails.shipperContact,
                shipperPhone: acceptanceData.contactDetails.shipperPhone,
                carrierContact: acceptanceData.contactDetails.carrierContact,
                carrierPhone: acceptanceData.contactDetails.carrierPhone,
                bookingUrl,
            },
        }));
        await Promise.all(emailPromises);
    }
    async sendBookingReminder(email, bookingData, reminderType) {
        const bookingUrl = `${this.getBaseUrl()}/bookings/${bookingData.bookingId}`;
        const subject = reminderType === 'pickup'
            ? `Pickup Reminder - Booking #${bookingData.bookingId}`
            : `Delivery Reminder - Booking #${bookingData.bookingId}`;
        await this.mailService.sendMail({
            to: email,
            from: this.config.get('USER_GMAIL'),
            subject: subject,
            template: './bookingReminder',
            context: {
                bookingId: bookingData.bookingId,
                reminderType,
                scheduledTime: new Date(bookingData.preferredPickupTime).toLocaleDateString(),
                contactPerson: bookingData.contactPerson,
                contactPhone: bookingData.contactPhone,
                location: reminderType === 'pickup'
                    ? `${bookingData.pickupLocation.address}, ${bookingData.pickupLocation.city}`
                    : `${bookingData.deliveryLocation.address}, ${bookingData.deliveryLocation.city}`,
                bookingUrl,
            },
        });
    }
    async sendBidNotification(bid) {
        try {
            const bookingUrl = `${this.getBaseUrl()}/bookings/${bid.bookingId}`;
            const bidUrl = `${this.getBaseUrl()}/bookings/${bid.bookingId}/bids/${bid.id}`;
            const bidData = {
                bidId: bid.id,
                bookingId: bid.bookingId,
                bidAmount: bid.bidAmount,
                proposedPickupTime: bid.proposedPickupTime,
                estimatedDeliveryTime: bid.estimatedDeliveryTime,
                truckDetails: bid.truckDetails || {
                    makeModel: 'N/A',
                    year: 2020,
                    licensePlate: 'N/A',
                    maxPayload: 0,
                },
                driverDetails: bid.driverDetails || {
                    fullName: 'N/A',
                    contactPhone: 'N/A',
                    experienceYears: 0,
                },
                contactPerson: bid.contactPerson,
                message: bid.message,
                companyName: bid.carrier?.companyName || 'Unknown Company',
            };
            const shipperEmail = bid.booking?.shipper?.businessEmail || 'admin@iptruck.com';
            await this.sendBidReceivedNotification(shipperEmail, bidData);
            const carrierEmail = bid.contactEmail || bid.carrier?.businessEmail || 'carrier@iptruck.com';
            await this.mailService.sendMail({
                to: carrierEmail,
                from: this.config.get('USER_GMAIL'),
                subject: `Bid Submitted Successfully - Booking #${bid.bookingId}`,
                template: './bidSubmitted',
                context: {
                    bidId: bid.id,
                    bookingId: bid.bookingId,
                    bidAmount: bid.bidAmount.toLocaleString(),
                    proposedPickupTime: new Date(bid.proposedPickupTime).toLocaleDateString(),
                    estimatedDeliveryTime: new Date(bid.estimatedDeliveryTime).toLocaleDateString(),
                    companyName: bid.carrier?.companyName || 'Your Company',
                    contactPerson: bid.contactPerson,
                    bidUrl,
                    bookingUrl,
                },
            });
        }
        catch (error) {
            console.error('Error sending bid notification:', error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map