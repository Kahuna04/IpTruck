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
var BookingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = exports.BookingStatus = void 0;
const common_1 = require("@nestjs/common");
const create_bid_dto_1 = require("../bidding/dto/create-bid.dto");
const email_service_1 = require("../email/email.service");
const prisma_service_1 = require("../prisma/prisma.service");
const helper_service_1 = require("../shared/helper.service");
const client_1 = require("@prisma/client");
var client_2 = require("@prisma/client");
Object.defineProperty(exports, "BookingStatus", { enumerable: true, get: function () { return client_2.BookingStatus; } });
let BookingService = BookingService_1 = class BookingService {
    emailService;
    prisma;
    helperService;
    logger = new common_1.Logger(BookingService_1.name);
    bookings = new Map();
    bids = new Map();
    userBookings = new Map();
    userBids = new Map();
    constructor(emailService, prisma, helperService) {
        this.emailService = emailService;
        this.prisma = prisma;
        this.helperService = helperService;
    }
    async createBooking(createBookingDto, shipperId) {
        try {
            const shipper = await this.prisma.shipper.findUnique({
                where: { id: shipperId },
                select: { companyName: true },
            });
            if (!shipper) {
                throw new common_1.NotFoundException('Shipper not found');
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
            if (booking.notificationsEnabled) {
                await this.notifyCarriersOfNewBooking(booking);
            }
            this.logger.log(`Booking created successfully: ${booking.id}`);
            return booking;
        }
        catch (error) {
            this.logger.error(`Error creating booking: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getBookings(userId, status, urgencyLevel, truckType, location, limit = 20, offset = 0) {
        try {
            const where = {};
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
        }
        catch (error) {
            this.logger.error(`Error fetching bookings: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getBookingById(bookingId) {
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
                throw new common_1.NotFoundException(`Booking with ID ${bookingId} not found`);
            }
            return booking;
        }
        catch (error) {
            this.logger.error(`Error fetching booking: ${error.message}`, error.stack);
            throw error;
        }
    }
    async updateBookingStatus(bookingId, status, userId) {
        const booking = await this.getBookingById(bookingId);
        if (booking.shipperId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this booking');
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
    async createBid(createBidDto, carrierId) {
        const booking = await this.getBookingById(createBidDto.bookingId);
        if (booking.status !== client_1.BookingStatus.ACTIVE &&
            booking.status !== client_1.BookingStatus.PENDING_BIDS) {
            throw new common_1.BadRequestException('Booking is no longer accepting bids');
        }
        if (booking.expiresAt && new Date(booking.expiresAt) < new Date()) {
            throw new common_1.BadRequestException('Booking has expired');
        }
        const carrier = await this.prisma.carrier.findUnique({
            where: { id: carrierId },
            select: { companyName: true },
        });
        if (!carrier) {
            throw new common_1.NotFoundException('Carrier not found');
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
        if (booking.status === client_1.BookingStatus.ACTIVE) {
            await this.prisma.booking.update({
                where: { id: booking.id },
                data: { status: client_1.BookingStatus.BIDS_RECEIVED },
            });
        }
        if (booking.notificationsEnabled) {
            await this.notifyShipperOfNewBid(booking, bid);
        }
        return bid;
    }
    async getBidsForBooking(bookingId, userId) {
        const booking = await this.getBookingById(bookingId);
        if (booking.shipperId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view bids for this booking');
        }
        return booking.bids;
    }
    async getUserBids(userId) {
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
    async updateBid(bidId, updateBidDto, userId) {
        const bid = await this.prisma.bid.findUnique({
            where: { id: bidId },
            include: {
                booking: true,
                carrier: true,
            },
        });
        if (!bid) {
            throw new common_1.NotFoundException(`Bid with ID ${bidId} not found`);
        }
        if (bid.carrierId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to update this bid');
        }
        if (bid.status !== 'PENDING') {
            throw new common_1.BadRequestException('Bid can only be updated while it is pending');
        }
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
    async respondToBid(bidId, bidResponseDto, userId) {
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
            throw new common_1.NotFoundException(`Bid with ID ${bidId} not found`);
        }
        const booking = bid.booking;
        if (booking.shipperId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to respond to this bid');
        }
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
        if (bidResponseDto.status === 'ACCEPTED') {
            await this.prisma.booking.update({
                where: { id: booking.id },
                data: {
                    status: client_1.BookingStatus.ACCEPTED,
                    acceptedBidId: bidId,
                },
            });
            await this.prisma.bid.updateMany({
                where: {
                    bookingId: booking.id,
                    id: { not: bidId },
                    status: 'PENDING',
                },
                data: { status: 'REJECTED' },
            });
            await this.notifyBidAcceptance(booking, updatedBid);
            await this.notifyRejectedBidders(booking, bidId);
        }
        return updatedBid;
    }
    async cancelBooking(bookingId, userId, reason) {
        const booking = await this.getBookingById(bookingId);
        if (booking.shipperId !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to cancel this booking');
        }
        if (booking.status === client_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cannot cancel a completed booking');
        }
        booking.status = client_1.BookingStatus.CANCELLED;
        booking.updatedAt = new Date().toISOString();
        this.bookings.set(bookingId, booking);
        await this.notifyBookingCancellation(booking, reason);
        return booking;
    }
    async getBookingStats(userId) {
        const userBookingIds = this.userBookings.get(userId) || [];
        const userBidIds = this.userBids.get(userId) || [];
        const userBookings = userBookingIds
            .map((id) => this.bookings.get(id))
            .filter(Boolean);
        const userBids = userBidIds.map((id) => this.bids.get(id)).filter(Boolean);
        return {
            totalBookings: userBookings.length,
            activeBookings: userBookings.filter((b) => b &&
                (b.status === client_1.BookingStatus.ACTIVE ||
                    b.status === client_1.BookingStatus.BIDS_RECEIVED)).length,
            completedBookings: userBookings.filter((b) => b && b.status === client_1.BookingStatus.COMPLETED).length,
            totalBids: userBids.length,
            acceptedBids: userBids.filter((b) => b && b.status === create_bid_dto_1.BidStatus.ACCEPTED)
                .length,
            pendingBids: userBids.filter((b) => b && b.status === create_bid_dto_1.BidStatus.PENDING)
                .length,
        };
    }
    async notifyCarriersOfNewBooking(booking) {
        const carrierEmails = ['carrier1@example.com', 'carrier2@example.com'];
        const bookingData = {
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
        await this.emailService.sendNewBookingNotification(carrierEmails, bookingData);
    }
    async notifyShipperOfNewBid(booking, bid) {
        const bidData = {
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
        const shipperEmail = booking.contactEmail || 'shipper@example.com';
        await this.emailService.sendBidReceivedNotification(shipperEmail, bidData);
    }
    async notifyBidAcceptance(booking, acceptedBid) {
        const acceptanceData = {
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
        const carrierEmail = acceptedBid.contactEmail || 'carrier@example.com';
        await this.emailService.sendBidAcceptedNotification(carrierEmail, acceptanceData);
        const allEmails = [
            booking.contactEmail || 'shipper@example.com',
            acceptedBid.contactEmail || 'carrier@example.com',
        ];
        await this.emailService.sendBookingConfirmation(allEmails, acceptanceData);
    }
    async notifyRejectedBidders(booking, acceptedBidId) {
        const rejectedBids = booking.bids.filter((b) => b.id !== acceptedBidId && b.status === create_bid_dto_1.BidStatus.REJECTED);
        for (const bid of rejectedBids) {
            const bidData = {
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
            await this.emailService.sendBidRejectedNotification(carrierEmail, bidData);
        }
    }
    async notifyBookingCancellation(booking, reason) {
        const pendingBids = booking.bids.filter((b) => b.status === create_bid_dto_1.BidStatus.PENDING);
        for (const bid of pendingBids) {
            const bidData = {
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
            await this.emailService.sendBidRejectedNotification(carrierEmail, bidData, reason || 'Booking has been cancelled');
        }
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = BookingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        prisma_service_1.PrismaService,
        helper_service_1.HelperService])
], BookingService);
//# sourceMappingURL=booking.service.js.map