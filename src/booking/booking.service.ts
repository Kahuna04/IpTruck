import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  CreateBidDto,
  BidResponseDto,
  BidStatus,
} from '../bidding/dto/create-bid.dto';
import { UpdateBidDto } from '../bidding/dto/update-bid.dto';
import {
  EmailService,
  BookingData,
  BidData,
  BidAcceptanceData,
} from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '../shared/helper.service';
import {
  Booking,
  BookingStatus,
  BidStatus as PrismaBidStatus,
} from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export { BookingStatus } from '@prisma/client';

export interface BookingEntity {
  id: string;
  shipperId: string;
  shipperCompany: string;
  referenceNumber?: string;
  description: string;
  pickupLocation: {
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
  };
  deliveryLocation: {
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
  };
  cargoDetails: {
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
  };
  preferredTruckType: string;
  preferredPickupTime: string;
  latestPickupTime?: string;
  requiredDeliveryTime?: string;
  urgencyLevel: string;
  loadingType: string;
  unloadingType: string;
  proposedPrice: number;
  currency: string;
  minimumPrice?: number;
  maximumPrice?: number;
  isNegotiable: boolean;
  additionalRequirements?: string;
  requiredServices?: string[];
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  expiresAt?: string;
  notificationsEnabled: boolean;
  isRecurring: boolean;
  recurrencePattern?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  bids: BidEntity[];
  acceptedBidId?: string;
}

export interface BidEntity {
  id: string;
  bookingId: string;
  carrierId: string;
  carrierCompany: string;
  bidAmount: number;
  currency: string;
  proposedPickupTime: string;
  estimatedDeliveryTime: string;
  truckDetails: {
    makeModel: string;
    year: number;
    licensePlate: string;
    maxPayload: number;
    cargoVolume?: number;
    condition: string;
    mileage?: number;
    equipment?: string;
    availableServices?: string[];
    photoUrl?: string;
    insuranceNumber?: string;
    insuranceExpiryDate?: string;
  };
  driverDetails: {
    fullName: string;
    licenseNumber: string;
    licenseExpiryDate: string;
    experienceYears: number;
    contactPhone: string;
    rating?: number;
    completedTrips?: number;
    certifications?: string[];
  };
  message?: string;
  includedServices?: string[];
  bidExpiresAt?: string;
  isNegotiable: boolean;
  paymentTerms?: string;
  specialTerms?: string;
  minimumAcceptablePrice?: number;
  documentationUrl?: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  status: BidStatus;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  private readonly bookings = new Map<string, BookingEntity>();
  private readonly bids = new Map<string, BidEntity>();
  private readonly userBookings = new Map<string, string[]>();
  private readonly userBids = new Map<string, string[]>();

  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Create a new booking
   */
  async createBooking(
    createBookingDto: CreateBookingDto,
    shipperId: string,
  ): Promise<Booking> {
    try {
      // Get shipper company name
      const shipper = await this.prisma.shipper.findUnique({
        where: { id: shipperId },
        select: { companyName: true },
      });

      if (!shipper) {
        throw new NotFoundException('Shipper not found');
      }

      const booking = await this.prisma.booking.create({
        data: {
          shipperId,
          referenceNumber: this.helperService.generateReferenceNumber('BK'),
          description: createBookingDto.description,
          pickupLocation: createBookingDto.pickupLocation,
          deliveryLocation: createBookingDto.deliveryLocation,
          cargoDetails: createBookingDto.cargoDetails,
          preferredTruckType: createBookingDto.preferredTruckType,
          preferredPickupTime: new Date(createBookingDto.preferredPickupTime),
          latestPickupTime: createBookingDto.latestPickupTime
            ? new Date(createBookingDto.latestPickupTime)
            : null,
          requiredDeliveryTime: createBookingDto.requiredDeliveryTime
            ? new Date(createBookingDto.requiredDeliveryTime)
            : null,
          urgencyLevel: createBookingDto.urgencyLevel,
          loadingType: createBookingDto.loadingType,
          unloadingType: createBookingDto.unloadingType,
          proposedPrice: createBookingDto.proposedPrice,
          currency: createBookingDto.currency || 'NGN',
          minimumPrice: createBookingDto.minimumPrice,
          maximumPrice: createBookingDto.maximumPrice,
          isNegotiable: createBookingDto.isNegotiable ?? true,
          additionalRequirements: createBookingDto.additionalRequirements,
          requiredServices: createBookingDto.requiredServices || [],
          contactPerson: createBookingDto.contactPerson,
          contactPhone: createBookingDto.contactPhone,
          contactEmail: createBookingDto.contactEmail,
          expiresAt: createBookingDto.expiresAt
            ? new Date(createBookingDto.expiresAt)
            : null,
          notificationsEnabled: createBookingDto.notificationsEnabled ?? true,
          isRecurring: createBookingDto.isRecurring ?? false,
          recurrencePattern: createBookingDto.recurrencePattern,
          status: 'ACTIVE',
        },
        include: {
          bids: true,
          shipper: {
            select: {
              companyName: true,
              businessEmail: true,
            },
          },
        },
      });

      // Send notifications to carriers if enabled
      if (booking.notificationsEnabled) {
        await this.notifyCarriersOfNewBooking(booking as any);
      }

      this.logger.log(`Booking created successfully: ${booking.id}`);
      return booking;
    } catch (error) {
      this.logger.error(
        `Error creating booking: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Get all bookings with optional filters
   */
  async getBookings(
    userId?: string,
    status?: string,
    urgencyLevel?: string,
    truckType?: string,
    location?: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<{ bookings: any[]; total: number }> {
    try {
      const where: any = {};

      // Apply filters
      if (userId) {
        where.shipperId = userId;
      }

      if (status) {
        where.status = status;
      }

      if (urgencyLevel) {
        where.urgencyLevel = urgencyLevel;
      }

      if (truckType) {
        where.preferredTruckType = truckType;
      }

      if (location) {
        where.OR = [
          { pickupLocation: { path: ['city'], string_contains: location } },
          { pickupLocation: { path: ['state'], string_contains: location } },
          { deliveryLocation: { path: ['city'], string_contains: location } },
          { deliveryLocation: { path: ['state'], string_contains: location } },
        ];
      }

      const [bookings, total] = await Promise.all([
        this.prisma.booking.findMany({
          where,
          skip: offset,
          take: limit,
          include: {
            bids: {
              include: {
                carrier: {
                  select: {
                    companyName: true,
                    rating: true,
                  },
                },
              },
            },
            shipper: {
              select: {
                companyName: true,
                businessEmail: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.booking.count({ where }),
      ]);

      return { bookings, total };
    } catch (error) {
      this.logger.error(
        `Error fetching bookings: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Get a booking by ID
   */
  async getBookingById(bookingId: string): Promise<any> {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          bids: {
            include: {
              carrier: {
                select: {
                  companyName: true,
                  rating: true,
                  contactFirstName: true,
                  contactLastName: true,
                },
              },
            },
          },
          shipper: {
            select: {
              companyName: true,
              businessEmail: true,
              contactFirstName: true,
              contactLastName: true,
            },
          },
        },
      });

      if (!booking) {
        throw new NotFoundException(`Booking with ID ${bookingId} not found`);
      }

      return booking;
    } catch (error) {
      this.logger.error(
        `Error fetching booking: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Update booking status
   */
  async updateBookingStatus(
    bookingId: string,
    status: BookingStatus,
    userId: string,
  ): Promise<any> {
    const booking = await this.getBookingById(bookingId);

    // Check if user has permission to update this booking
    if (booking.shipperId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this booking',
      );
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status },
      include: {
        bids: true,
        shipper: {
          select: {
            companyName: true,
          },
        },
      },
    });
  }

  /**
   * Create a bid for a booking
   */
  async createBid(createBidDto: CreateBidDto, carrierId: string): Promise<any> {
    const booking = await this.getBookingById(createBidDto.bookingId);

    // Check if booking is still active
    if (
      booking.status !== BookingStatus.ACTIVE &&
      booking.status !== BookingStatus.PENDING_BIDS
    ) {
      throw new BadRequestException('Booking is no longer accepting bids');
    }

    // Check if booking has expired
    if (booking.expiresAt && new Date(booking.expiresAt) < new Date()) {
      throw new BadRequestException('Booking has expired');
    }

    // Get carrier info
    const carrier = await this.prisma.carrier.findUnique({
      where: { id: carrierId },
      select: { companyName: true },
    });

    if (!carrier) {
      throw new NotFoundException('Carrier not found');
    }

    const bid = await this.prisma.bid.create({
      data: {
        bookingId: createBidDto.bookingId,
        carrierId,
        bidAmount: createBidDto.bidAmount,
        currency: createBidDto.currency || 'NGN',
        proposedPickupTime: new Date(createBidDto.proposedPickupTime),
        estimatedDeliveryTime: new Date(createBidDto.estimatedDeliveryTime),
        truckDetails: createBidDto.truckDetails,
        driverDetails: createBidDto.driverDetails,
        message: createBidDto.message,
        includedServices: createBidDto.includedServices || [],
        bidExpiresAt: createBidDto.bidExpiresAt
          ? new Date(createBidDto.bidExpiresAt)
          : null,
        isNegotiable: createBidDto.isNegotiable ?? true,
        paymentTerms: createBidDto.paymentTerms,
        specialTerms: createBidDto.specialTerms,
        minimumAcceptablePrice: createBidDto.minimumAcceptablePrice,
        documentationUrl: createBidDto.documentationUrl,
        contactPerson: createBidDto.contactPerson,
        contactPhone: createBidDto.contactPhone,
        contactEmail: createBidDto.contactEmail,
        status: 'PENDING',
      },
      include: {
        carrier: {
          select: {
            companyName: true,
          },
        },
      },
    });

    // Update booking status if it's the first bid
    if (booking.status === BookingStatus.ACTIVE) {
      await this.prisma.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.BIDS_RECEIVED },
      });
    }

    // Send notification to shipper
    if (booking.notificationsEnabled) {
      await this.notifyShipperOfNewBid(booking, bid);
    }

    return bid;
  }

  /**
   * Get bids for a booking
   */
  async getBidsForBooking(
    bookingId: string,
    userId: string,
  ): Promise<BidEntity[]> {
    const booking = await this.getBookingById(bookingId);

    // Check if user has permission to view bids
    if (booking.shipperId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view bids for this booking',
      );
    }

    return booking.bids;
  }

  /**
   * Get user's bids
   */
  async getUserBids(userId: string): Promise<any[]> {
    const bids = await this.prisma.bid.findMany({
      where: { carrierId: userId },
      include: {
        booking: {
          select: {
            id: true,
            description: true,
            status: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bids;
  }

  /**
   * Update a bid
   */
  async updateBid(
    bidId: string,
    updateBidDto: UpdateBidDto,
    userId: string,
  ): Promise<any> {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: {
        booking: true,
        carrier: true,
      },
    });

    if (!bid) {
      throw new NotFoundException(`Bid with ID ${bidId} not found`);
    }

    // Check if user has permission to update this bid
    if (bid.carrierId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this bid',
      );
    }

    // Check if bid is still pending
    if (bid.status !== 'PENDING') {
      throw new BadRequestException(
        'Bid can only be updated while it is pending',
      );
    }

    // Update bid
    const updatedBid = await this.prisma.bid.update({
      where: { id: bidId },
      data: updateBidDto,
      include: {
        booking: true,
        carrier: {
          select: {
            companyName: true,
          },
        },
      },
    });

    return updatedBid;
  }

  /**
   * Respond to a bid (accept/reject/counter-offer)
   */
  async respondToBid(
    bidId: string,
    bidResponseDto: BidResponseDto,
    userId: string,
  ): Promise<any> {
    const bid = await this.prisma.bid.findUnique({
      where: { id: bidId },
      include: {
        booking: true,
        carrier: {
          select: {
            companyName: true,
          },
        },
      },
    });

    if (!bid) {
      throw new NotFoundException(`Bid with ID ${bidId} not found`);
    }

    const booking = bid.booking;

    // Check if user has permission to respond to this bid
    if (booking.shipperId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to respond to this bid',
      );
    }

    // Update bid status
    const updatedBid = await this.prisma.bid.update({
      where: { id: bidId },
      data: { status: bidResponseDto.status },
      include: {
        booking: true,
        carrier: {
          select: {
            companyName: true,
          },
        },
      },
    });

    // Handle acceptance
    if (bidResponseDto.status === 'ACCEPTED') {
      // Update booking status and set accepted bid
      await this.prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: BookingStatus.ACCEPTED,
          acceptedBidId: bidId,
        },
      });

      // Reject all other bids for this booking
      await this.prisma.bid.updateMany({
        where: {
          bookingId: booking.id,
          id: { not: bidId },
          status: 'PENDING',
        },
        data: { status: 'REJECTED' },
      });

      // Send notifications
      await this.notifyBidAcceptance(booking as any, updatedBid as any);
      await this.notifyRejectedBidders(booking as any, bidId);
    }

    return updatedBid;
  }

  /**
   * Cancel a booking
   */
  async cancelBooking(
    bookingId: string,
    userId: string,
    reason?: string,
  ): Promise<BookingEntity> {
    const booking = await this.getBookingById(bookingId);

    // Check if user has permission to cancel this booking
    if (booking.shipperId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to cancel this booking',
      );
    }

    // Check if booking can be cancelled
    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cannot cancel a completed booking');
    }

    booking.status = BookingStatus.CANCELLED;
    booking.updatedAt = new Date().toISOString();

    this.bookings.set(bookingId, booking);

    // Notify all bidders
    await this.notifyBookingCancellation(booking, reason);

    return booking;
  }

  /**
   * Get booking statistics
   */
  async getBookingStats(userId: string): Promise<{
    totalBookings: number;
    activeBookings: number;
    completedBookings: number;
    totalBids: number;
    acceptedBids: number;
    pendingBids: number;
  }> {
    const userBookingIds = this.userBookings.get(userId) || [];
    const userBidIds = this.userBids.get(userId) || [];

    const userBookings = userBookingIds
      .map((id) => this.bookings.get(id))
      .filter(Boolean);
    const userBids = userBidIds.map((id) => this.bids.get(id)).filter(Boolean);

    return {
      totalBookings: userBookings.length,
      activeBookings: userBookings.filter(
        (b) =>
          b &&
          (b.status === BookingStatus.ACTIVE ||
            b.status === BookingStatus.BIDS_RECEIVED),
      ).length,
      completedBookings: userBookings.filter(
        (b) => b && b.status === BookingStatus.COMPLETED,
      ).length,
      totalBids: userBids.length,
      acceptedBids: userBids.filter((b) => b && b.status === BidStatus.ACCEPTED)
        .length,
      pendingBids: userBids.filter((b) => b && b.status === BidStatus.PENDING)
        .length,
    };
  }

  /**
   * Private helper methods for notifications
   */
  private async notifyCarriersOfNewBooking(
    booking: BookingEntity,
  ): Promise<void> {
    // In production, this would query the database for active carriers
    // For demo purposes, we'll use placeholder emails
    const carrierEmails = ['carrier1@example.com', 'carrier2@example.com'];

    const bookingData: BookingData = {
      bookingId: booking.id,
      referenceNumber: booking.referenceNumber,
      description: booking.description,
      pickupLocation: booking.pickupLocation,
      deliveryLocation: booking.deliveryLocation,
      preferredPickupTime: booking.preferredPickupTime,
      proposedPrice: booking.proposedPrice,
      contactPerson: booking.contactPerson,
      contactPhone: booking.contactPhone,
      cargoType: booking.cargoDetails.type,
      weight: booking.cargoDetails.weight,
      urgencyLevel: booking.urgencyLevel,
    };

    await this.emailService.sendNewBookingNotification(
      carrierEmails,
      bookingData,
    );
  }

  private async notifyShipperOfNewBid(
    booking: BookingEntity,
    bid: any,
  ): Promise<void> {
    const bidData: BidData = {
      bidId: bid.id,
      bookingId: bid.bookingId,
      bidAmount: bid.bidAmount,
      proposedPickupTime: bid.proposedPickupTime,
      estimatedDeliveryTime: bid.estimatedDeliveryTime,
      truckDetails: bid.truckDetails,
      driverDetails: bid.driverDetails,
      contactPerson: bid.contactPerson,
      message: bid.message,
      companyName: bid.carrier?.companyName || 'Unknown Carrier',
    };

    // In production, get shipper email from user service
    const shipperEmail = booking.contactEmail || 'shipper@example.com';
    await this.emailService.sendBidReceivedNotification(shipperEmail, bidData);
  }

  private async notifyBidAcceptance(
    booking: BookingEntity,
    acceptedBid: BidEntity,
  ): Promise<void> {
    const acceptanceData: BidAcceptanceData = {
      bidId: acceptedBid.id,
      bookingId: booking.id,
      finalAmount: acceptedBid.bidAmount,
      pickupTime: acceptedBid.proposedPickupTime,
      deliveryTime: acceptedBid.estimatedDeliveryTime,
      shipperCompany: booking.shipperCompany,
      carrierCompany: acceptedBid.carrierCompany,
      contactDetails: {
        shipperContact: booking.contactPerson,
        shipperPhone: booking.contactPhone,
        carrierContact: acceptedBid.contactPerson,
        carrierPhone: acceptedBid.contactPhone,
      },
    };

    // Notify carrier of acceptance
    const carrierEmail = acceptedBid.contactEmail || 'carrier@example.com';
    await this.emailService.sendBidAcceptedNotification(
      carrierEmail,
      acceptanceData,
    );

    // Send confirmation to both parties
    const allEmails = [
      booking.contactEmail || 'shipper@example.com',
      acceptedBid.contactEmail || 'carrier@example.com',
    ];
    await this.emailService.sendBookingConfirmation(allEmails, acceptanceData);
  }

  private async notifyRejectedBidders(
    booking: BookingEntity,
    acceptedBidId: string,
  ): Promise<void> {
    const rejectedBids = booking.bids.filter(
      (b) => b.id !== acceptedBidId && b.status === BidStatus.REJECTED,
    );

    for (const bid of rejectedBids) {
      const bidData: BidData = {
        bidId: bid.id,
        bookingId: bid.bookingId,
        bidAmount: bid.bidAmount,
        proposedPickupTime: bid.proposedPickupTime,
        estimatedDeliveryTime: bid.estimatedDeliveryTime,
        truckDetails: bid.truckDetails,
        driverDetails: bid.driverDetails,
        contactPerson: bid.contactPerson,
        message: bid.message,
        companyName: bid.carrierCompany,
      };

      const carrierEmail = bid.contactEmail || 'carrier@example.com';
      await this.emailService.sendBidRejectedNotification(
        carrierEmail,
        bidData,
      );
    }
  }

  private async notifyBookingCancellation(
    booking: BookingEntity,
    reason?: string,
  ): Promise<void> {
    const pendingBids = booking.bids.filter(
      (b) => b.status === BidStatus.PENDING,
    );

    for (const bid of pendingBids) {
      const bidData: BidData = {
        bidId: bid.id,
        bookingId: bid.bookingId,
        bidAmount: bid.bidAmount,
        proposedPickupTime: bid.proposedPickupTime,
        estimatedDeliveryTime: bid.estimatedDeliveryTime,
        truckDetails: bid.truckDetails,
        driverDetails: bid.driverDetails,
        contactPerson: bid.contactPerson,
        message: bid.message,
        companyName: bid.carrierCompany,
      };

      const carrierEmail = bid.contactEmail || 'carrier@example.com';
      await this.emailService.sendBidRejectedNotification(
        carrierEmail,
        bidData,
        reason || 'Booking has been cancelled',
      );
    }
  }
}
