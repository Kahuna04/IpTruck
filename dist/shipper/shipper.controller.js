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
exports.ShipperController = void 0;
const common_1 = require("@nestjs/common");
const shipper_service_1 = require("./shipper.service");
const create_shipper_dto_1 = require("./dto/create-shipper.dto");
const update_shipper_dto_1 = require("./dto/update-shipper.dto");
const jwt_at_guard_1 = require("../auth/guards/jwt_at.guard");
const swagger_1 = require("@nestjs/swagger");
let ShipperController = class ShipperController {
    shipperService;
    constructor(shipperService) {
        this.shipperService = shipperService;
    }
    create(createShipperDto, req) {
        const userId = req.user['sub'];
        return this.shipperService.create(createShipperDto, userId);
    }
    findAll(page, limit) {
        return this.shipperService.findAll(page, limit);
    }
    search(query, page, limit) {
        return this.shipperService.search(query, page, limit);
    }
    getMyProfile(req) {
        const userId = req.user['sub'];
        return this.shipperService.findByUserId(userId);
    }
    findOne(id) {
        return this.shipperService.findOne(id);
    }
    getStatistics(id) {
        return this.shipperService.getStatistics(id);
    }
    update(id, updateShipperDto) {
        return this.shipperService.update(id, updateShipperDto);
    }
    remove(id) {
        return this.shipperService.remove(id);
    }
};
exports.ShipperController = ShipperController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new shipper profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Shipper profile created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipper_dto_1.CreateShipperDto, Object]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all shippers with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of shippers retrieved successfully' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search shippers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user shipper profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shipper profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipper profile not found' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shipper by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shipper retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipper not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get shipper statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipper not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update shipper profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Shipper updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipper not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipper_dto_1.UpdateShipperDto]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete shipper' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Shipper deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Shipper not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShipperController.prototype, "remove", null);
exports.ShipperController = ShipperController = __decorate([
    (0, swagger_1.ApiTags)('Shipper'),
    (0, common_1.Controller)('shipper'),
    (0, common_1.UseGuards)(jwt_at_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [shipper_service_1.ShipperService])
], ShipperController);
//# sourceMappingURL=shipper.controller.js.map