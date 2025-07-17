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
exports.BiddingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const helper_service_1 = require("../shared/helper.service");
const email_service_1 = require("../email/email.service");
let BiddingService = class BiddingService {
    prisma;
    helperService;
    emailService;
    constructor(prisma, helperService, emailService) {
        this.prisma = prisma;
        this.helperService = helperService;
        this.emailService = emailService;
    }
    async create(createBidDto) {
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
                booking: true,
                carrier: true,
            },
        });
        try {
            await this.emailService.sendBidNotification(bid);
        }
        catch (error) {
            console.error('Failed to send bid notification:', error);
        }
        return bid;
    }
    async findAll(filters, options) {
        const where = {};
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
    async findOne(id) {
        const bid = await this.prisma.bid.findUnique({
            where: { id },
            include: {
                booking: true,
                carrier: true,
            },
        });
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        return bid;
    }
    async update(id, updateBidDto) {
        const existingBid = await this.findOne(id);
        const updateData = {};
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
    async remove(id) {
        const bid = await this.findOne(id);
        return this.prisma.bid.delete({
            where: { id },
        });
    }
    async getStatistics(userId) {
        const [totalBids, pendingBids, acceptedBids, rejectedBids, cancelledBids] = await Promise.all([
            this.prisma.bid.count({ where: { carrierId: userId } }),
            this.prisma.bid.count({
                where: { carrierId: userId, status: 'PENDING' },
            }),
            this.prisma.bid.count({
                where: { carrierId: userId, status: 'ACCEPTED' },
            }),
            this.prisma.bid.count({
                where: { carrierId: userId, status: 'REJECTED' },
            }),
            this.prisma.bid.count({
                where: { carrierId: userId, status: 'WITHDRAWN' },
            }),
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
    async createBid(createBidDto) {
        return this.create(createBidDto);
    }
    async getBidsByBookingId(bookingId) {
        return this.prisma.bid.findMany({
            where: { bookingId },
            include: { carrier: true },
        });
    }
    async getBidById(bidId) {
        return this.findOne(bidId);
    }
    async updateBidStatus(bidId, status) {
        return this.prisma.bid.update({
            where: { id: bidId },
            data: { status: status.toUpperCase() },
        });
    }
};
exports.BiddingService = BiddingService;
exports.BiddingService = BiddingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_service_1.HelperService,
        email_service_1.EmailService])
], BiddingService);
//# sourceMappingURL=bidding.service.js.map