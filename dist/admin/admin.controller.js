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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const jwt_at_guard_1 = require("../auth/guards/jwt_at.guard");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const document_verification_dto_1 = require("./dto/document-verification.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllUsers() {
        return await this.adminService.getAllUsers();
    }
    async getUserById(id) {
        return await this.adminService.getUserById(id);
    }
    async createAdmin(createAdminDto) {
        return await this.adminService.createAdmin(createAdminDto);
    }
    async updateUser(id, updateUserDto) {
        return await this.adminService.updateUser(id, updateUserDto);
    }
    async deleteUser(id) {
        await this.adminService.deleteUser(id);
        return { message: 'User deleted successfully' };
    }
    async suspendUser(id) {
        return await this.adminService.suspendUser(id);
    }
    async activateUser(id) {
        return await this.adminService.activateUser(id);
    }
    async getAllDocuments() {
        return await this.adminService.getAllDocuments();
    }
    async getPendingDocuments() {
        return await this.adminService.getPendingDocuments();
    }
    async verifyDocument(id, verificationDto) {
        return await this.adminService.verifyDocument(id, verificationDto);
    }
    async deleteDocument(id) {
        await this.adminService.deleteDocument(id);
        return { message: 'Document deleted successfully' };
    }
    async getAllBids() {
        return await this.adminService.getAllBids();
    }
    async getBidById(id) {
        return await this.adminService.getBidById(id);
    }
    async deleteBid(id) {
        await this.adminService.deleteBid(id);
        return { message: 'Bid deleted successfully' };
    }
    async getDashboardStats() {
        return await this.adminService.getDashboardStats();
    }
    async getUsersRegisteredInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return await this.adminService.getUsersRegisteredInDateRange(start, end);
    }
    async getRecentActivity() {
        return await this.adminService.getRecentActivity();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)('users/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Put)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)('users/:id/suspend'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "suspendUser", null);
__decorate([
    (0, common_1.Put)('users/:id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Get)('documents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllDocuments", null);
__decorate([
    (0, common_1.Get)('documents/pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingDocuments", null);
__decorate([
    (0, common_1.Put)('documents/:id/verify'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, document_verification_dto_1.DocumentVerificationDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "verifyDocument", null);
__decorate([
    (0, common_1.Delete)('documents/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Get)('bids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBids", null);
__decorate([
    (0, common_1.Get)('bids/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getBidById", null);
__decorate([
    (0, common_1.Delete)('bids/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteBid", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('users/registered'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsersRegisteredInDateRange", null);
__decorate([
    (0, common_1.Get)('activity/recent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRecentActivity", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_at_guard_1.JwtGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map