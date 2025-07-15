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
var ShipperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipperService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const helper_service_1 = require("../shared/helper.service");
let ShipperService = ShipperService_1 = class ShipperService {
    prisma;
    helperService;
    logger = new common_1.Logger(ShipperService_1.name);
    constructor(prisma, helperService) {
        this.prisma = prisma;
        this.helperService = helperService;
    }
    async create(createShipperDto) {
        try {
            const shipper = await this.prisma.shipper.create({
                data: {
                    ...createShipperDto,
                },
            });
            this.logger.log(`Shipper created successfully: ${shipper.id}`);
            return shipper;
        }
        catch (error) {
            this.logger.error(`Error creating shipper: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        try {
            const [shippers, total] = await Promise.all([
                this.prisma.shipper.findMany({
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                isActive: true,
                                isVerified: true,
                                createdAt: true,
                            },
                        },
                        _count: {
                            select: {
                                bookings: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                }),
                this.prisma.shipper.count(),
            ]);
            const pagination = this.helperService.getPaginationMeta(page, limit, total);
            return {
                data: shippers,
                pagination,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching shippers: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const shipper = await this.prisma.shipper.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            isActive: true,
                            isVerified: true,
                            createdAt: true,
                        },
                    },
                    bookings: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            proposedPrice: true,
                            currency: true,
                            createdAt: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 5,
                    },
                },
            });
            if (!shipper) {
                throw new common_1.NotFoundException(`Shipper with ID ${id} not found`);
            }
            return shipper;
        }
        catch (error) {
            this.logger.error(`Error fetching shipper: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findByUserId(userId) {
        try {
            return await this.prisma.shipper.findUnique({
                where: { userId },
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            isActive: true,
                            isVerified: true,
                            createdAt: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error fetching shipper by user ID: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updateShipperDto) {
        try {
            const shipper = await this.prisma.shipper.update({
                where: { id },
                data: updateShipperDto,
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                            isActive: true,
                            isVerified: true,
                            createdAt: true,
                        },
                    },
                },
            });
            this.logger.log(`Shipper updated successfully: ${shipper.id}`);
            return shipper;
        }
        catch (error) {
            this.logger.error(`Error updating shipper: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.prisma.shipper.delete({
                where: { id },
            });
            this.logger.log(`Shipper deleted successfully: ${id}`);
        }
        catch (error) {
            this.logger.error(`Error deleting shipper: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getStatistics(shipperId) {
        try {
            const stats = await this.prisma.shipper.findUnique({
                where: { id: shipperId },
                select: {
                    _count: {
                        select: {
                            bookings: true,
                        },
                    },
                    bookings: {
                        select: {
                            status: true,
                            proposedPrice: true,
                            currency: true,
                        },
                    },
                },
            });
            if (!stats) {
                throw new common_1.NotFoundException(`Shipper with ID ${shipperId} not found`);
            }
            const bookingsByStatus = stats.bookings.reduce((acc, booking) => {
                acc[booking.status] = (acc[booking.status] || 0) + 1;
                return acc;
            }, {});
            const totalSpent = stats.bookings
                .filter(booking => booking.status === 'COMPLETED')
                .reduce((total, booking) => total + booking.proposedPrice, 0);
            return {
                totalBookings: stats._count.bookings,
                bookingsByStatus,
                totalSpent,
                currency: stats.bookings[0]?.currency || 'NGN',
            };
        }
        catch (error) {
            this.logger.error(`Error fetching shipper statistics: ${error.message}`, error.stack);
            throw error;
        }
    }
    async search(query, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        try {
            const [shippers, total] = await Promise.all([
                this.prisma.shipper.findMany({
                    where: {
                        OR: [
                            { companyName: { contains: query, mode: 'insensitive' } },
                            { businessEmail: { contains: query, mode: 'insensitive' } },
                            { city: { contains: query, mode: 'insensitive' } },
                            { state: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                    skip,
                    take: limit,
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                isActive: true,
                                isVerified: true,
                                createdAt: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                }),
                this.prisma.shipper.count({
                    where: {
                        OR: [
                            { companyName: { contains: query, mode: 'insensitive' } },
                            { businessEmail: { contains: query, mode: 'insensitive' } },
                            { city: { contains: query, mode: 'insensitive' } },
                            { state: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                }),
            ]);
            const pagination = this.helperService.getPaginationMeta(page, limit, total);
            return {
                data: shippers,
                pagination,
            };
        }
        catch (error) {
            this.logger.error(`Error searching shippers: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.ShipperService = ShipperService;
exports.ShipperService = ShipperService = ShipperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_service_1.HelperService])
], ShipperService);
//# sourceMappingURL=shipper.service.js.map