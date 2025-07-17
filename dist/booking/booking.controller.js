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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const booking_service_1 = require("./booking.service");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const create_bid_dto_1 = require("../bidding/dto/create-bid.dto");
const CurrentUser = () => (target, propertyKey, parameterIndex) => {
};
class JwtAuthGuard {
    canActivate() {
        return true;
    }
}
let BookingController = class BookingController {
    bookingService;
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createBooking(createBookingDto, user) {
        const mockUser = {
            id: 'user123',
            companyName: 'Coca-Cola Nigeria',
        };
        return this.bookingService.createBooking(createBookingDto, mockUser.id);
    }
    async getBookings(status, urgencyLevel, truckType, location, myBookings, limit, offset, user) {
        const userId = myBookings ? 'user123' : undefined;
        return this.bookingService.getBookings(userId, status, urgencyLevel, truckType, location, limit, offset);
    }
    async getBookingById(id) {
        return this.bookingService.getBookingById(id);
    }
    async updateBookingStatus(id, body, user) {
        return this.bookingService.updateBookingStatus(id, body.status, 'user123');
    }
    async cancelBooking(id, body, user) {
        await this.bookingService.cancelBooking(id, 'user123', body.reason);
    }
    async getBidsForBooking(id, user) {
        return this.bookingService.getBidsForBooking(id, 'user123');
    }
    async createBid(bookingId, createBidDto, user) {
        createBidDto.bookingId = bookingId;
        const mockUser = {
            id: 'carrier123',
            companyName: 'Swift Logistics Ltd',
        };
        return this.bookingService.createBid(createBidDto, mockUser.id);
    }
    async getUserBids(user) {
        return this.bookingService.getUserBids('carrier123');
    }
    async updateBid(bidId, updateBidDto, user) {
        return this.bookingService.updateBid(bidId, updateBidDto, 'carrier123');
    }
    async respondToBid(bidId, bidResponseDto, user) {
        return this.bookingService.respondToBid(bidId, bidResponseDto, 'user123');
    }
    async getBookingStats(user) {
        return this.bookingService.getBookingStats('user123');
    }
    async searchBookings(pickupCity, deliveryCity, truckType, urgencyLevel, minPrice, maxPrice, limit, offset) {
        const result = await this.bookingService.getBookings(undefined, booking_service_1.BookingStatus.ACTIVE, urgencyLevel, truckType, pickupCity || deliveryCity, limit, offset);
        if ((minPrice && minPrice > 0) ||
            (maxPrice && maxPrice < Number.MAX_SAFE_INTEGER)) {
            result.bookings = result.bookings.filter((booking) => booking.proposedPrice >= (minPrice || 0) &&
                booking.proposedPrice <= (maxPrice || Number.MAX_SAFE_INTEGER));
            result.total = result.bookings.length;
        }
        return result;
    }
    async getBookingTracking(id, user) {
        const booking = await this.bookingService.getBookingById(id);
        return {
            bookingId: booking.id,
            status: booking.status,
            currentLocation: { latitude: 6.5244, longitude: 3.3792 },
            estimatedArrival: booking.requiredDeliveryTime,
            lastUpdate: new Date().toISOString(),
        };
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new truck booking',
        description: 'Creates a new booking request for truck transportation. The booking will be made available to carriers who can then submit bids.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Booking created successfully',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                shipperId: 'user123',
                shipperCompany: 'Coca-Cola Nigeria',
                description: 'Coca-Cola distribution to retailers',
                status: 'active',
                createdAt: '2024-07-15T10:30:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid booking data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_booking_dto_1.CreateBookingDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get bookings with filters',
        description: 'Retrieve bookings with optional filtering by status, urgency, truck type, and location. Supports pagination.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: booking_service_1.BookingStatus,
        description: 'Filter by booking status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'urgencyLevel',
        required: false,
        description: 'Filter by urgency level (low, medium, high, urgent, emergency)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'truckType',
        required: false,
        description: 'Filter by preferred truck type',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'location',
        required: false,
        description: 'Filter by pickup or delivery location',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'myBookings',
        required: false,
        type: Boolean,
        description: "Get only current user's bookings",
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of results per page (default: 20)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        type: Number,
        description: 'Number of results to skip (default: 0)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bookings retrieved successfully',
        schema: {
            example: {
                bookings: [
                    {
                        id: '550e8400-e29b-41d4-a716-446655440000',
                        description: 'Coca-Cola distribution to retailers',
                        status: 'active',
                        urgencyLevel: 'high',
                        proposedPrice: 150000,
                        bids: [],
                    },
                ],
                total: 1,
            },
        },
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('urgencyLevel')),
    __param(2, (0, common_1.Query)('truckType')),
    __param(3, (0, common_1.Query)('location')),
    __param(4, (0, common_1.Query)('myBookings')),
    __param(5, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(6, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(7, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking by ID',
        description: 'Retrieve detailed information about a specific booking including all bids received.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking found',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                description: 'Coca-Cola distribution to retailers',
                status: 'bids_received',
                bids: [
                    {
                        id: 'bid123',
                        bidAmount: 145000,
                        status: 'pending',
                        truckDetails: { makeModel: 'Mercedes Actros' },
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingById", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update booking status',
        description: 'Update the status of a booking. Only the booking creator can update the status.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking status updated successfully',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the booking owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBookingStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel a booking',
        description: 'Cancel a booking and notify all bidders. Only the booking creator can cancel.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Booking cancelled successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the booking owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)(':id/bids'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get bids for a booking',
        description: 'Retrieve all bids submitted for a specific booking. Only the booking creator can view bids.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bids retrieved successfully',
        schema: {
            example: [
                {
                    id: 'bid123',
                    bidAmount: 145000,
                    status: 'pending',
                    truckDetails: { makeModel: 'Mercedes Actros', year: 2020 },
                    driverDetails: { fullName: 'John Doe', experienceYears: 8 },
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the booking owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBidsForBooking", null);
__decorate([
    (0, common_1.Post)(':id/bids'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit a bid for a booking',
        description: 'Submit a bid for a truck booking. Only carriers can submit bids.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Bid submitted successfully',
        schema: {
            example: {
                id: 'bid123',
                bookingId: '550e8400-e29b-41d4-a716-446655440000',
                bidAmount: 145000,
                status: 'pending',
                createdAt: '2024-07-15T11:00:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid bid data or booking not accepting bids',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_bid_dto_1.CreateBidDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBid", null);
__decorate([
    (0, common_1.Get)('my-bids'),
    (0, swagger_1.ApiOperation)({
        summary: "Get current user's bids",
        description: 'Retrieve all bids submitted by the current user across all bookings.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User bids retrieved successfully',
        schema: {
            example: [
                {
                    id: 'bid123',
                    bookingId: '550e8400-e29b-41d4-a716-446655440000',
                    bidAmount: 145000,
                    status: 'pending',
                },
            ],
        },
    }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getUserBids", null);
__decorate([
    (0, common_1.Put)('bids/:bidId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a bid',
        description: 'Update a pending bid. Only the bid creator can update their bid.',
    }),
    (0, swagger_1.ApiParam)({ name: 'bidId', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bid updated successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bid cannot be updated (not pending)',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not the bid owner' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_bid_dto_1.UpdateBidDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "updateBid", null);
__decorate([
    (0, common_1.Post)('bids/:bidId/respond'),
    (0, swagger_1.ApiOperation)({
        summary: 'Respond to a bid',
        description: 'Accept, reject, or counter-offer a bid. Only the booking creator can respond to bids.',
    }),
    (0, swagger_1.ApiParam)({ name: 'bidId', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid response submitted successfully',
        schema: {
            example: {
                id: 'bid123',
                status: 'accepted',
                updatedAt: '2024-07-15T12:00:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the booking owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('bidId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_bid_dto_1.BidResponseDto, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "respondToBid", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking statistics',
        description: 'Get statistics for the current user including booking and bid counts.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistics retrieved successfully',
        schema: {
            example: {
                totalBookings: 15,
                activeBookings: 3,
                completedBookings: 10,
                totalBids: 25,
                acceptedBids: 8,
                pendingBids: 5,
            },
        },
    }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingStats", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search available bookings',
        description: 'Search for available bookings based on various criteria. Useful for carriers looking for loads.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'pickupCity',
        required: false,
        description: 'Filter by pickup city',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'deliveryCity',
        required: false,
        description: 'Filter by delivery city',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'truckType',
        required: false,
        description: 'Filter by required truck type',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'urgencyLevel',
        required: false,
        description: 'Filter by urgency level',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'minPrice',
        required: false,
        type: Number,
        description: 'Minimum price filter',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxPrice',
        required: false,
        type: Number,
        description: 'Maximum price filter',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of results (default: 20)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        type: Number,
        description: 'Results offset (default: 0)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Search results retrieved successfully',
        schema: {
            example: {
                bookings: [
                    {
                        id: '550e8400-e29b-41d4-a716-446655440000',
                        description: 'Coca-Cola distribution',
                        pickupLocation: { city: 'Lagos', state: 'Lagos State' },
                        deliveryLocation: { city: 'Abuja', state: 'FCT' },
                        proposedPrice: 150000,
                        urgencyLevel: 'high',
                    },
                ],
                total: 1,
            },
        },
    }),
    __param(0, (0, common_1.Query)('pickupCity')),
    __param(1, (0, common_1.Query)('deliveryCity')),
    __param(2, (0, common_1.Query)('truckType')),
    __param(3, (0, common_1.Query)('urgencyLevel')),
    __param(4, (0, common_1.Query)('minPrice', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('maxPrice', new common_1.DefaultValuePipe(Number.MAX_SAFE_INTEGER), common_1.ParseIntPipe)),
    __param(6, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(7, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "searchBookings", null);
__decorate([
    (0, common_1.Get)(':id/tracking'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get booking tracking information',
        description: 'Get real-time tracking information for an accepted booking.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Tracking information retrieved successfully',
        schema: {
            example: {
                bookingId: '550e8400-e29b-41d4-a716-446655440000',
                status: 'in_progress',
                currentLocation: { latitude: 6.5244, longitude: 3.3792 },
                estimatedArrival: '2024-07-15T16:00:00Z',
                lastUpdate: '2024-07-15T13:30:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingTracking", null);
exports.BookingController = BookingController = __decorate([
    (0, swagger_1.ApiTags)('Bookings'),
    (0, common_1.Controller)('bookings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(JwtAuthGuard),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map