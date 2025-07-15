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
var CarrierService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrierService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const helper_service_1 = require("../shared/helper.service");
let CarrierService = CarrierService_1 = class CarrierService {
    prisma;
    helperService;
    logger = new common_1.Logger(CarrierService_1.name);
    constructor(prisma, helperService) {
        this.prisma = prisma;
        this.helperService = helperService;
    }
    async create(createCarrierDto) {
        try {
            const carrier = await this.prisma.carrier.create({
                data: {
                    ...createCarrierDto,
                },
            });
            this.logger.log(`Carrier created successfully: ${carrier.id}`);
            return carrier;
        }
        catch (error) {
            this.logger.error(`Error creating carrier: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        try {
            const [carriers, total] = await Promise.all([
                this.prisma.carrier.findMany({
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
                                trucks: true,
                                bids: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                }),
                this.prisma.carrier.count(),
            ]);
            const pagination = this.helperService.getPaginationMeta(page, limit, total);
            return {
                data: carriers,
                pagination,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching carriers: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const carrier = await this.prisma.carrier.findUnique({
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
                    trucks: {
                        select: {
                            id: true,
                            makeModel: true,
                            year: true,
                            licensePlate: true,
                            truckType: true,
                            maxPayload: true,
                            isActive: true,
                            createdAt: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                    bids: {
                        select: {
                            id: true,
                            bidAmount: true,
                            status: true,
                            createdAt: true,
                            booking: {
                                select: {
                                    id: true,
                                    description: true,
                                    status: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 5,
                    },
                },
            });
            if (!carrier) {
                throw new common_1.NotFoundException(`Carrier with ID ${id} not found`);
            }
            return carrier;
        }
        catch (error) {
            this.logger.error(`Error fetching carrier: ${error.message}`, error.stack);
            throw error;
        }
    }
    async findByUserId(userId) {
        try {
            return await this.prisma.carrier.findUnique({
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
                    trucks: {
                        select: {
                            id: true,
                            makeModel: true,
                            year: true,
                            licensePlate: true,
                            truckType: true,
                            maxPayload: true,
                            isActive: true,
                            createdAt: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            this.logger.error(`Error fetching carrier by user ID: ${error.message}`, error.stack);
            throw error;
        }
    }
    async update(id, updateCarrierDto) {
        try {
            const carrier = await this.prisma.carrier.update({
                where: { id },
                data: updateCarrierDto,
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
            this.logger.log(`Carrier updated successfully: ${carrier.id}`);
            return carrier;
        }
        catch (error) {
            this.logger.error(`Error updating carrier: ${error.message}`, error.stack);
            throw error;
        }
    }
    async remove(id) {
        try {
            await this.prisma.carrier.delete({
                where: { id },
            });
            this.logger.log(`Carrier deleted successfully: ${id}`);
        }
        catch (error) {
            this.logger.error(`Error deleting carrier: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getStatistics(carrierId) {
        try {
            const stats = await this.prisma.carrier.findUnique({
                where: { id: carrierId },
                select: {
                    rating: true,
                    completedJobs: true,
                    _count: {
                        select: {
                            trucks: true,
                            bids: true,
                        },
                    },
                    bids: {
                        select: {
                            status: true,
                            bidAmount: true,
                            currency: true,
                        },
                    },
                },
            });
            if (!stats) {
                throw new common_1.NotFoundException(`Carrier with ID ${carrierId} not found`);
            }
            const bidsByStatus = stats.bids.reduce((acc, bid) => {
                acc[bid.status] = (acc[bid.status] || 0) + 1;
                return acc;
            }, {});
            const totalEarnings = stats.bids
                .filter(bid => bid.status === 'ACCEPTED')
                .reduce((total, bid) => total + bid.bidAmount, 0);
            return {
                rating: stats.rating,
                completedJobs: stats.completedJobs,
                totalTrucks: stats._count.trucks,
                totalBids: stats._count.bids,
                bidsByStatus,
                totalEarnings,
                currency: stats.bids[0]?.currency || 'NGN',
            };
        }
        catch (error) {
            this.logger.error(`Error fetching carrier statistics: ${error.message}`, error.stack);
            throw error;
        }
    }
    async search(query, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        try {
            const [carriers, total] = await Promise.all([
                this.prisma.carrier.findMany({
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
                        _count: {
                            select: {
                                trucks: true,
                                bids: true,
                            },
                        },
                    },
                    orderBy: {
                        rating: 'desc',
                    },
                }),
                this.prisma.carrier.count({
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
                data: carriers,
                pagination,
            };
        }
        catch (error) {
            this.logger.error(`Error searching carriers: ${error.message}`, error.stack);
            throw error;
        }
    }
    async addTruck(carrierId, createTruckDto) {
        try {
            const truck = await this.prisma.truck.create({
                data: {
                    carrierId,
                    ...createTruckDto,
                },
            });
            this.logger.log(`Truck added to carrier ${carrierId}: ${truck.id}`);
            return truck;
        }
        catch (error) {
            this.logger.error(`Error adding truck: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getTrucks(carrierId) {
        try {
            return await this.prisma.truck.findMany({
                where: { carrierId },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        catch (error) {
            this.logger.error(`Error fetching trucks: ${error.message}`, error.stack);
            throw error;
        }
    }
    async getTruckById(truckId) {
        try {
            const truck = await this.prisma.truck.findUnique({
                where: { id: truckId },
                include: {
                    carrier: {
                        select: {
                            id: true,
                            companyName: true,
                            businessEmail: true,
                            contactPhone: true,
                        },
                    },
                },
            });
            if (!truck) {
                throw new common_1.NotFoundException(`Truck with ID ${truckId} not found`);
            }
            return truck;
        }
        catch (error) {
            this.logger.error(`Error fetching truck: ${error.message}`, error.stack);
            throw error;
        }
    }
    async updateTruck(truckId, updateTruckDto) {
        try {
            const truck = await this.prisma.truck.update({
                where: { id: truckId },
                data: updateTruckDto,
            });
            this.logger.log(`Truck updated successfully: ${truck.id}`);
            return truck;
        }
        catch (error) {
            this.logger.error(`Error updating truck: ${error.message}`, error.stack);
            throw error;
        }
    }
    async removeTruck(truckId) {
        try {
            await this.prisma.truck.delete({
                where: { id: truckId },
            });
            this.logger.log(`Truck deleted successfully: ${truckId}`);
        }
        catch (error) {
            this.logger.error(`Error deleting truck: ${error.message}`, error.stack);
            throw error;
        }
    }
    async updateRating(carrierId, newRating) {
        try {
            const carrier = await this.prisma.carrier.update({
                where: { id: carrierId },
                data: {
                    rating: newRating,
                },
            });
            this.logger.log(`Carrier rating updated: ${carrierId} - ${newRating}`);
            return carrier;
        }
        catch (error) {
            this.logger.error(`Error updating carrier rating: ${error.message}`, error.stack);
            throw error;
        }
    }
    async incrementCompletedJobs(carrierId) {
        try {
            const carrier = await this.prisma.carrier.update({
                where: { id: carrierId },
                data: {
                    completedJobs: {
                        increment: 1,
                    },
                },
            });
            this.logger.log(`Completed jobs incremented for carrier: ${carrierId}`);
            return carrier;
        }
        catch (error) {
            this.logger.error(`Error incrementing completed jobs: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.CarrierService = CarrierService;
exports.CarrierService = CarrierService = CarrierService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_service_1.HelperService])
], CarrierService);
//# sourceMappingURL=carrier.service.js.map