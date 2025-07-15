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
exports.BiddingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bidding_service_1 = require("./bidding.service");
const create_bid_dto_1 = require("./dto/create-bid.dto");
const update_bid_dto_1 = require("./dto/update-bid.dto");
const client_1 = require("@prisma/client");
class JwtAuthGuard {
}
const CurrentUser = () => (target, propertyKey, parameterIndex) => { };
let BiddingController = class BiddingController {
    biddingService;
    constructor(biddingService) {
        this.biddingService = biddingService;
    }
    async create(createBidDto, user) {
        if (createBidDto.carrierId !== user.id) {
            throw new common_1.ForbiddenException('You can only create bids for yourself');
        }
        try {
            const bid = await this.biddingService.create(createBidDto);
            return {
                message: 'Bid created successfully',
                data: bid,
            };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.BadRequestException('Duplicate bid detected');
            }
            if (error.code === 'P2003') {
                throw new common_1.NotFoundException('Booking not found');
            }
            throw error;
        }
    }
    async findAll(bookingId, bidderId, status, minAmount, maxAmount, currency, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', user) {
        const filters = {
            bookingId,
            bidderId,
            status,
            minAmount: minAmount ? Number(minAmount) : undefined,
            maxAmount: maxAmount ? Number(maxAmount) : undefined,
            currency,
        };
        const options = {
            page: Number(page),
            limit: Math.min(Number(limit), 100),
            sortBy,
            sortOrder,
        };
        const result = await this.biddingService.findAll(filters, options);
        return {
            message: 'Bids retrieved successfully',
            data: result.bids,
            pagination: {
                page: options.page,
                limit: options.limit,
                total: result.total,
                pages: Math.ceil(result.total / options.limit),
            },
        };
    }
    async findMyBids(status, page = 1, limit = 10, user) {
        const filters = {
            bidderId: user.id,
            status,
        };
        const options = {
            page: Number(page),
            limit: Math.min(Number(limit), 100),
            sortBy: 'createdAt',
            sortOrder: 'desc',
        };
        const result = await this.biddingService.findAll(filters, options);
        return {
            message: 'Your bids retrieved successfully',
            data: result.bids,
            pagination: {
                page: options.page,
                limit: options.limit,
                total: result.total,
                pages: Math.ceil(result.total / options.limit),
            },
        };
    }
    async findBidsForBooking(bookingId, status, page = 1, limit = 10, user) {
        const filters = {
            bookingId,
            status,
        };
        const options = {
            page: Number(page),
            limit: Math.min(Number(limit), 100),
            sortBy: 'createdAt',
            sortOrder: 'desc',
        };
        const result = await this.biddingService.findAll(filters, options);
        return {
            message: 'Booking bids retrieved successfully',
            data: result.bids,
            pagination: {
                page: options.page,
                limit: options.limit,
                total: result.total,
                pages: Math.ceil(result.total / options.limit),
            },
        };
    }
    async findOne(id, user) {
        const bid = await this.biddingService.findOne(id);
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        return {
            message: 'Bid retrieved successfully',
            data: bid,
        };
    }
    async update(id, updateBidDto, user) {
        const existingBid = await this.biddingService.findOne(id);
        if (!existingBid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (existingBid.carrierId !== user.id) {
            throw new common_1.ForbiddenException('You can only update your own bids');
        }
        if (existingBid.status === client_1.BidStatus.ACCEPTED || existingBid.status === client_1.BidStatus.REJECTED) {
            throw new common_1.BadRequestException('Cannot update accepted or rejected bids');
        }
        const updatedBid = await this.biddingService.update(id, updateBidDto);
        return {
            message: 'Bid updated successfully',
            data: updatedBid,
        };
    }
    async acceptBid(id, user) {
        const bid = await this.biddingService.findOne(id);
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending bids can be accepted');
        }
        if (bid.validUntil && new Date() > new Date(bid.validUntil)) {
            throw new common_1.BadRequestException('Bid has expired');
        }
        const acceptedBid = await this.biddingService.update(id, { status: client_1.BidStatus.ACCEPTED });
        return {
            message: 'Bid accepted successfully',
            data: acceptedBid,
        };
    }
    async rejectBid(id, user) {
        const bid = await this.biddingService.findOne(id);
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending bids can be rejected');
        }
        const rejectedBid = await this.biddingService.update(id, { status: client_1.BidStatus.REJECTED });
        return {
            message: 'Bid rejected successfully',
            data: rejectedBid,
        };
    }
    async cancelBid(id, user) {
        const bid = await this.biddingService.findOne(id);
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.carrierId !== user.id) {
            throw new common_1.ForbiddenException('You can only cancel your own bids');
        }
        if (bid.status !== client_1.BidStatus.PENDING) {
            throw new common_1.BadRequestException('Only pending bids can be cancelled');
        }
        const cancelledBid = await this.biddingService.update(id, { status: client_1.BidStatus.CANCELLED });
        return {
            message: 'Bid cancelled successfully',
            data: cancelledBid,
        };
    }
    async getStats(user) {
        const stats = await this.biddingService.getStatistics(user.id);
        return {
            message: 'Bidding statistics retrieved successfully',
            data: stats,
        };
    }
    async remove(id, user) {
        const bid = await this.biddingService.findOne(id);
        if (!bid) {
            throw new common_1.NotFoundException('Bid not found');
        }
        if (bid.carrierId !== user.id) {
            throw new common_1.ForbiddenException('You can only delete your own bids');
        }
        if (bid.status !== client_1.BidStatus.PENDING && bid.status !== client_1.BidStatus.CANCELLED) {
            throw new common_1.BadRequestException('Only pending or cancelled bids can be deleted');
        }
        await this.biddingService.remove(id);
        return {
            message: 'Bid deleted successfully',
        };
    }
};
exports.BiddingController = BiddingController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bid' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Bid created successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                bookingId: { type: 'string', format: 'uuid' },
                bidderId: { type: 'string', format: 'uuid' },
                amount: { type: 'number' },
                currency: { type: 'string' },
                status: { type: 'string', enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'] },
                message: { type: 'string' },
                validUntil: { type: 'string', format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Body)()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bid_dto_1.CreateBidDto, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bids with optional filtering' }),
    (0, swagger_1.ApiQuery)({ name: 'bookingId', required: false, description: 'Filter by booking ID' }),
    (0, swagger_1.ApiQuery)({ name: 'bidderId', required: false, description: 'Filter by bidder ID' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: client_1.BidStatus, description: 'Filter by bid status' }),
    (0, swagger_1.ApiQuery)({ name: 'minAmount', required: false, type: Number, description: 'Minimum bid amount' }),
    (0, swagger_1.ApiQuery)({ name: 'maxAmount', required: false, type: Number, description: 'Maximum bid amount' }),
    (0, swagger_1.ApiQuery)({ name: 'currency', required: false, description: 'Filter by currency' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'sortBy', required: false, description: 'Sort field (default: createdAt)' }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order (default: desc)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of bids retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', format: 'uuid' },
                            bookingId: { type: 'string', format: 'uuid' },
                            bidderId: { type: 'string', format: 'uuid' },
                            amount: { type: 'number' },
                            currency: { type: 'string' },
                            status: { type: 'string' },
                            message: { type: 'string' },
                            validUntil: { type: 'string', format: 'date-time' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                        },
                    },
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' },
                        pages: { type: 'number' },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('bookingId')),
    __param(1, (0, common_1.Query)('bidderId')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('minAmount')),
    __param(4, (0, common_1.Query)('maxAmount')),
    __param(5, (0, common_1.Query)('currency')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __param(8, (0, common_1.Query)('sortBy')),
    __param(9, (0, common_1.Query)('sortOrder')),
    __param(10, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number, String, Number, Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-bids'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user\'s bids' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: client_1.BidStatus, description: 'Filter by bid status' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User bids retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "findMyBids", null);
__decorate([
    (0, common_1.Get)('booking/:bookingId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bids for a specific booking' }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: client_1.BidStatus, description: 'Filter by bid status' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking bids retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "findBidsForBooking", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific bid by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'string', format: 'uuid' },
                bookingId: { type: 'string', format: 'uuid' },
                bidderId: { type: 'string', format: 'uuid' },
                amount: { type: 'number' },
                currency: { type: 'string' },
                status: { type: 'string' },
                message: { type: 'string' },
                validUntil: { type: 'string', format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bid (only by bidder)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bid_dto_1.UpdateBidDto, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Accept a bid (only by booking owner)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid accepted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot accept this bid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "acceptBid", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reject a bid (only by booking owner)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid rejected successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot reject this bid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "rejectBid", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a bid (only by bidder)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bid cancelled successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot cancel this bid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "cancelBid", null);
__decorate([
    (0, common_1.Get)('stats/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bidding statistics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Bidding statistics retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                totalBids: { type: 'number' },
                pendingBids: { type: 'number' },
                acceptedBids: { type: 'number' },
                rejectedBids: { type: 'number' },
                cancelledBids: { type: 'number' },
                averageBidAmount: { type: 'number' },
                userBidCount: { type: 'number' },
            },
        },
    }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "getStats", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bid (only by bidder for pending bids)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Bid ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'Bid deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Insufficient permissions' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bid not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot delete this bid' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BiddingController.prototype, "remove", null);
exports.BiddingController = BiddingController = __decorate([
    (0, swagger_1.ApiTags)('Bidding'),
    (0, common_1.Controller)('bidding'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(JwtAuthGuard),
    __metadata("design:paramtypes", [bidding_service_1.BiddingService])
], BiddingController);
//# sourceMappingURL=bidding.controller.js.map