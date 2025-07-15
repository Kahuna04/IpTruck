import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Updated interfaces for truck booking platform
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

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly config: ConfigService,
  ) {}

  private getBaseUrl(): string {
    return this.config.get<string>('BASE_URL') || 'https://iptruck.com';
  }

  /* 
=======================================
Send Welcome Email for Company Registration
========================================
*/
  async sendCompanyWelcomeEmail(companyData: CompanyData, token: string) {
    const confirmationUrl = `${this.getBaseUrl()}/auth/confirm?token=${token}`;

    await this.mailService.sendMail({
      to: companyData.businessEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Account Activation Email
========================================
*/
  async sendAccountActivationEmail(companyData: CompanyData, activationCode: string) {
    const activationUrl = `${this.getBaseUrl()}/auth/activate/${activationCode}`;

    await this.mailService.sendMail({
      to: companyData.businessEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Account Activation Success Email
========================================
*/
  async sendAccountActivationSuccessEmail(companyData: CompanyData) {
    const dashboardUrl = `${this.getBaseUrl()}/dashboard`;

    await this.mailService.sendMail({
      to: companyData.businessEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Password Recovery Email
========================================
*/
  async sendPasswordRecoveryEmail(data: PasswordRecoveryData) {
    const { email, name, resetToken } = data;
    const resetPasswordUrl = `${this.getBaseUrl()}/auth/reset-password?token=${resetToken}`;

    await this.mailService.sendMail({
      to: email,
      from: this.config.get<string>('USER_GMAIL'),
      subject: 'IpTruck Password Recovery',
      template: './forgotPassword',
      context: {
        name: name,
        resetPasswordUrl,
      },
    });
  }

  /* 
=======================================
Send New Booking Notification to Carriers
========================================
*/
  async sendNewBookingNotification(carrierEmails: string[], bookingData: BookingData) {
    const bookingUrl = `${this.getBaseUrl()}/bookings/${bookingData.bookingId}`;

    const emailPromises = carrierEmails.map(email => 
      this.mailService.sendMail({
        to: email,
        from: this.config.get<string>('USER_GMAIL'),
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
      })
    );

    await Promise.all(emailPromises);
  }

  /* 
=======================================
Send Bid Received Notification to Shipper
========================================
*/
  async sendBidReceivedNotification(shipperEmail: string, bidData: BidData) {
    const bidUrl = `${this.getBaseUrl()}/bookings/${bidData.bookingId}/bids/${bidData.bidId}`;

    await this.mailService.sendMail({
      to: shipperEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Bid Accepted Notification to Carrier
========================================
*/
  async sendBidAcceptedNotification(carrierEmail: string, acceptanceData: BidAcceptanceData) {
    const bookingUrl = `${this.getBaseUrl()}/bookings/${acceptanceData.bookingId}`;

    await this.mailService.sendMail({
      to: carrierEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Bid Rejected Notification to Carrier
========================================
*/
  async sendBidRejectedNotification(carrierEmail: string, bidData: BidData, reason?: string) {
    await this.mailService.sendMail({
      to: carrierEmail,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Booking Confirmation to Both Parties
========================================
*/
  async sendBookingConfirmation(emails: string[], acceptanceData: BidAcceptanceData) {
    const bookingUrl = `${this.getBaseUrl()}/bookings/${acceptanceData.bookingId}`;

    const emailPromises = emails.map(email => 
      this.mailService.sendMail({
        to: email,
        from: this.config.get<string>('USER_GMAIL'),
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
      })
    );

    await Promise.all(emailPromises);
  }

  /* 
=======================================
Send Booking Reminder Email
========================================
*/
  async sendBookingReminder(email: string, bookingData: BookingData, reminderType: 'pickup' | 'delivery') {
    const bookingUrl = `${this.getBaseUrl()}/bookings/${bookingData.bookingId}`;
    const subject = reminderType === 'pickup' 
      ? `Pickup Reminder - Booking #${bookingData.bookingId}` 
      : `Delivery Reminder - Booking #${bookingData.bookingId}`;

    await this.mailService.sendMail({
      to: email,
      from: this.config.get<string>('USER_GMAIL'),
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

  /* 
=======================================
Send Bid Notification (General)
========================================
*/
  async sendBidNotification(bid: any) {
    try {
      // Get the booking details to extract shipper email
      const bookingUrl = `${this.getBaseUrl()}/bookings/${bid.bookingId}`;
      const bidUrl = `${this.getBaseUrl()}/bookings/${bid.bookingId}/bids/${bid.id}`;
      
      // Create BidData object from the bid
      const bidData: BidData = {
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

      // Send notification to shipper about the new bid
      const shipperEmail = bid.booking?.shipper?.businessEmail || 'admin@iptruck.com';
      await this.sendBidReceivedNotification(shipperEmail, bidData);

      // Send confirmation to the bidder (carrier)
      const carrierEmail = bid.contactEmail || bid.carrier?.businessEmail || 'carrier@iptruck.com';
      await this.mailService.sendMail({
        to: carrierEmail,
        from: this.config.get<string>('USER_GMAIL'),
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

    } catch (error) {
      console.error('Error sending bid notification:', error);
      // Don't throw error to prevent bid creation from failing
    }
  }
}
