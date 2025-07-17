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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers() {
        return await this.prisma.user.findMany({
            include: {
                documentsUploaded: true,
                shipper: true,
                carrier: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                documentsUploaded: true,
                shipper: true,
                carrier: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async createAdmin(createAdminDto) {
        const { email, password } = createAdminDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ForbiddenException('User with this email already exists');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const admin = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                userType: 'ADMIN',
                isVerified: true,
                isActive: true,
            },
        });
        return admin;
    }
    async updateUser(id, updateUserDto) {
        const user = await this.getUserById(id);
        const updateData = { ...updateUserDto };
        if (updateUserDto.password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(updateUserDto.password, saltRounds);
        }
        return await this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }
    async deleteUser(id) {
        const user = await this.getUserById(id);
        if (user.userType === 'ADMIN') {
            throw new common_1.ForbiddenException('Cannot delete admin users');
        }
        await this.prisma.user.delete({ where: { id } });
    }
    async suspendUser(id) {
        return await this.prisma.user.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async activateUser(id) {
        return await this.prisma.user.update({
            where: { id },
            data: { isActive: true },
        });
    }
    async getAllDocuments() {
        return await this.prisma.document.findMany({
            include: {
                uploadedBy: true,
                verifiedBy: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPendingDocuments() {
        return await this.prisma.document.findMany({
            where: { status: 'PENDING' },
            include: {
                uploadedBy: true,
                verifiedBy: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async verifyDocument(id, verificationDto) {
        const document = await this.prisma.document.findUnique({
            where: { id },
            include: {
                uploadedBy: true,
            },
        });
        if (!document) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        const updatedDocument = await this.prisma.document.update({
            where: { id },
            data: {
                status: verificationDto.status === 'approved' ? 'VERIFIED' : 'REJECTED',
                verifiedAt: new Date(),
            },
        });
        if (verificationDto.status === 'approved') {
            await this.prisma.user.update({
                where: { id: document.uploadedById },
                data: { isVerified: true },
            });
        }
        return updatedDocument;
    }
    async deleteDocument(id) {
        const document = await this.prisma.document.findUnique({ where: { id } });
        if (!document) {
            throw new common_1.NotFoundException(`Document with ID ${id} not found`);
        }
        await this.prisma.document.delete({ where: { id } });
    }
    async getAllBids() {
        return await this.prisma.bid.findMany({
            include: {
                carrier: true,
                booking: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getBidById(id) {
        const bid = await this.prisma.bid.findUnique({
            where: { id },
            include: {
                carrier: true,
                booking: true,
            },
        });
        if (!bid) {
            throw new common_1.NotFoundException(`Bid with ID ${id} not found`);
        }
        return bid;
    }
    async deleteBid(id) {
        const bid = await this.getBidById(id);
        await this.prisma.bid.delete({ where: { id } });
    }
    async getDashboardStats() {
        const [totalUsers, activeUsers, pendingDocuments, totalBids, verifiedUsers,] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
            this.prisma.document.count({ where: { status: 'PENDING' } }),
            this.prisma.bid.count(),
            this.prisma.user.count({ where: { isVerified: true } }),
        ]);
        return {
            totalUsers,
            activeUsers,
            pendingDocuments,
            totalBids,
            verifiedUsers,
            userVerificationRate: totalUsers > 0 ? (verifiedUsers / totalUsers) * 100 : 0,
        };
    }
    async getUsersRegisteredInDateRange(startDate, endDate) {
        return await this.prisma.user.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getRecentActivity() {
        const [recentUsers, recentDocuments, recentBids] = await Promise.all([
            this.prisma.user.findMany({
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            this.prisma.document.findMany({
                include: {
                    uploadedBy: true,
                },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
            this.prisma.bid.findMany({
                include: {
                    carrier: true,
                },
                orderBy: { createdAt: 'desc' },
                take: 5,
            }),
        ]);
        return {
            recentUsers,
            recentDocuments,
            recentBids,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map