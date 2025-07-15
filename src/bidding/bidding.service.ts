import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto, BidStatus } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { HelperService } from '../shared/helper.service';
import { EmailService } from '../email/email.service';

interface BidFilters {
  bookingId?: string;
  bidderId?: string;
  carrierId?: string;
  status?: BidStatus;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
}

interface BidOptions {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

@Injectable()
export class BiddingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
    private readonly emailService: EmailService,
  ) {}

  async create(createBidDto: CreateBidDto) {
    // Use IDs as strings for Prisma (they're already strings in the DTO)
    const bid = await this.prisma.bid.create({
      data: {
        bookingId: createBidDto.bookingId,
        carrierId: createBidDto.carrierId,
        bidAmount: createBidDto.bidAmount,
        currency: createBidDto.currency || 'NGN',
        proposedPickupTime: new Date(createBidDto.proposedPickupTime),
        estimatedDeliveryTime: new Date(createBidDto.estimatedDeliveryTime),
        truckDetails: createBidDto.truckDetails,
        driverDetails: createBidDto.driverDetails,
        message: createBidDto.message,
        includedServices: createBidDto.includedServices || [],
        bidExpiresAt: createBidDto.bidExpiresAt ? new Date(createBidDto.bidExpiresAt) : null,
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
        booking: true,
        carrier: true,
      },
    });
    
    // Notify via email
    try {
      await this.emailService.sendBidNotification(bid);
    } catch (error) {
      console.error('Failed to send bid notification:', error);
    }
    
    return bid;
  }

  async findAll(filters: BidFilters, options: BidOptions) {
    const where: any = {};
    
    if (filters.bookingId) {
      where.bookingId = filters.bookingId;
    }
    
    if (filters.bidderId || filters.carrierId) {
      where.carrierId = filters.bidderId || filters.carrierId;
    }
    
    if (filters.status) {
      where.status = filters.status.toUpperCase();
    }
    
    if (filters.minAmount || filters.maxAmount) {
      where.bidAmount = {};
      if (filters.minAmount) {
        where.bidAmount.gte = filters.minAmount;
      }
      if (filters.maxAmount) {
        where.bidAmount.lte = filters.maxAmount;
      }
    }
    
    if (filters.currency) {
      where.currency = filters.currency;
    }

    const [bids, total] = await Promise.all([
      this.prisma.bid.findMany({
        where,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        orderBy: {
          [options.sortBy]: options.sortOrder,
        },
        include: {
          booking: true,
          carrier: true,
        },
      }),
      this.prisma.bid.count({ where }),
    ]);

    return { bids, total };
  }

  async findOne(id: string) {
    const bid = await this.prisma.bid.findUnique({
      where: { id },
      include: {
        booking: true,
        carrier: true,
      },
    });
    
    if (!bid) {
      throw new NotFoundException('Bid not found');
    }
    
    return bid;
  }

  async update(id: string, updateBidDto: UpdateBidDto) {
    const existingBid = await this.findOne(id);
    
    const updateData: any = {};
    
    if (updateBidDto.status) {
      updateData.status = updateBidDto.status.toUpperCase();
    }
    
    if (updateBidDto.message) {
      updateData.message = updateBidDto.message;
    }
    
    if (updateBidDto.bidAmount) {
      updateData.bidAmount = updateBidDto.bidAmount;
    }
    
    if (updateBidDto.proposedPickupTime) {
      updateData.proposedPickupTime = new Date(updateBidDto.proposedPickupTime);
    }
    
    if (updateBidDto.estimatedDeliveryTime) {
      updateData.estimatedDeliveryTime = new Date(updateBidDto.estimatedDeliveryTime);
    }
    
    if (updateBidDto.bidExpiresAt) {
      updateData.bidExpiresAt = new Date(updateBidDto.bidExpiresAt);
    }
    
    if (updateBidDto.paymentTerms) {
      updateData.paymentTerms = updateBidDto.paymentTerms;
    }
    
    if (updateBidDto.specialTerms) {
      updateData.specialTerms = updateBidDto.specialTerms;
    }
    
    updateData.updatedAt = new Date();
    
    return this.prisma.bid.update({
      where: { id },
      data: updateData,
      include: {
        booking: true,
        carrier: true,
      },
    });
  }

  async remove(id: string) {
    const bid = await this.findOne(id);
    
    return this.prisma.bid.delete({
      where: { id },
    });
  }

  async getStatistics(userId: string) {
    const [totalBids, pendingBids, acceptedBids, rejectedBids, cancelledBids] = await Promise.all([
      this.prisma.bid.count({ where: { carrierId: userId } }),
      this.prisma.bid.count({ where: { carrierId: userId, status: 'PENDING' } }),
      this.prisma.bid.count({ where: { carrierId: userId, status: 'ACCEPTED' } }),
      this.prisma.bid.count({ where: { carrierId: userId, status: 'REJECTED' } }),
      this.prisma.bid.count({ where: { carrierId: userId, status: 'WITHDRAWN' } }),
    ]);
    
    const averageAmountResult = await this.prisma.bid.aggregate({
      where: { carrierId: userId },
      _avg: {
        bidAmount: true,
      },
    });
    
    return {
      totalBids,
      pendingBids,
      acceptedBids,
      rejectedBids,
      cancelledBids,
      averageBidAmount: averageAmountResult._avg.bidAmount || 0,
      userBidCount: totalBids,
    };
  }

  // Legacy methods for backward compatibility
  async createBid(createBidDto: CreateBidDto) {
    return this.create(createBidDto);
  }

  async getBidsByBookingId(bookingId: string) {
    return this.prisma.bid.findMany({
      where: { bookingId },
      include: { carrier: true },
    });
  }

  async getBidById(bidId: string) {
    return this.findOne(bidId);
  }

  async updateBidStatus(bidId: string, status: string) {
    return this.prisma.bid.update({
      where: { id: bidId },
      data: { status: status.toUpperCase() },
    });
  }
}
