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
exports.CarrierController = void 0;
const common_1 = require("@nestjs/common");
const carrier_service_1 = require("./carrier.service");
const create_carrier_dto_1 = require("./dto/create-carrier.dto");
const update_carrier_dto_1 = require("./dto/update-carrier.dto");
const create_truck_dto_1 = require("./dto/create-truck.dto");
const update_truck_dto_1 = require("./dto/update-truck.dto");
const jwt_at_guard_1 = require("../auth/guards/jwt_at.guard");
const swagger_1 = require("@nestjs/swagger");
let CarrierController = class CarrierController {
    carrierService;
    constructor(carrierService) {
        this.carrierService = carrierService;
    }
    create(createCarrierDto, req) {
        const userId = req.user['sub'];
        return this.carrierService.create(createCarrierDto, userId);
    }
    findAll(page, limit) {
        return this.carrierService.findAll(page, limit);
    }
    search(query, page, limit) {
        return this.carrierService.search(query, page, limit);
    }
    getMyProfile(req) {
        const userId = req.user['sub'];
        return this.carrierService.findByUserId(userId);
    }
    findOne(id) {
        return this.carrierService.findOne(id);
    }
    getStatistics(id) {
        return this.carrierService.getStatistics(id);
    }
    update(id, updateCarrierDto) {
        return this.carrierService.update(id, updateCarrierDto);
    }
    updateRating(id, rating) {
        return this.carrierService.updateRating(id, rating);
    }
    remove(id) {
        return this.carrierService.remove(id);
    }
    addTruck(carrierId, createTruckDto) {
        return this.carrierService.addTruck(carrierId, createTruckDto);
    }
    getTrucks(carrierId) {
        return this.carrierService.getTrucks(carrierId);
    }
    getTruckById(truckId) {
        return this.carrierService.getTruckById(truckId);
    }
    updateTruck(truckId, updateTruckDto) {
        return this.carrierService.updateTruck(truckId, updateTruckDto);
    }
    removeTruck(truckId) {
        return this.carrierService.removeTruck(truckId);
    }
};
exports.CarrierController = CarrierController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new carrier profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Carrier profile created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_carrier_dto_1.CreateCarrierDto, Object]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all carriers with pagination' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of carriers retrieved successfully' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search carriers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results retrieved successfully' }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user carrier profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carrier profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier profile not found' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get carrier by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carrier retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get carrier statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update carrier profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Carrier updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_carrier_dto_1.UpdateCarrierDto]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/rating'),
    (0, swagger_1.ApiOperation)({ summary: 'Update carrier rating' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rating updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('rating', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "updateRating", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete carrier' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Carrier deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/trucks'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Add a truck to carrier fleet' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Truck added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_truck_dto_1.CreateTruckDto]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "addTruck", null);
__decorate([
    (0, common_1.Get)(':id/trucks'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all trucks for a carrier' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trucks retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Carrier not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getTrucks", null);
__decorate([
    (0, common_1.Get)('trucks/:truckId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get truck by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Truck retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Truck not found' }),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "getTruckById", null);
__decorate([
    (0, common_1.Patch)('trucks/:truckId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update truck information' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Truck updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Truck not found' }),
    __param(0, (0, common_1.Param)('truckId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_truck_dto_1.UpdateTruckDto]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "updateTruck", null);
__decorate([
    (0, common_1.Delete)('trucks/:truckId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete truck' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Truck deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Truck not found' }),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarrierController.prototype, "removeTruck", null);
exports.CarrierController = CarrierController = __decorate([
    (0, swagger_1.ApiTags)('Carrier'),
    (0, common_1.Controller)('carrier'),
    (0, common_1.UseGuards)(jwt_at_guard_1.JwtGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [carrier_service_1.CarrierService])
], CarrierController);
//# sourceMappingURL=carrier.controller.js.map