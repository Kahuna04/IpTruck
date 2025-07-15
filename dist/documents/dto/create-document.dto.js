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
exports.CreateDocumentDto = exports.DocumentStatus = exports.DocumentType = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
var client_2 = require("@prisma/client");
Object.defineProperty(exports, "DocumentType", { enumerable: true, get: function () { return client_2.DocumentType; } });
var DocumentStatus;
(function (DocumentStatus) {
    DocumentStatus["PENDING"] = "PENDING";
    DocumentStatus["VERIFIED"] = "VERIFIED";
    DocumentStatus["REJECTED"] = "REJECTED";
    DocumentStatus["EXPIRED"] = "EXPIRED";
})(DocumentStatus || (exports.DocumentStatus = DocumentStatus = {}));
class CreateDocumentDto {
    type;
    bookingId;
    bidId;
    carrierId;
    billOfLadingId;
    metadata;
    expiresAt;
}
exports.CreateDocumentDto = CreateDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document type',
        enum: client_1.DocumentType,
    }),
    (0, class_validator_1.IsEnum)(client_1.DocumentType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Booking ID associated with this document',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bid ID associated with this document',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "bidId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Carrier ID associated with this document',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "carrierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bill of lading ID associated with this document',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "billOfLadingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document metadata in JSON format',
        example: { bolNumber: 'BOL123', weight: '1500kg' },
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateDocumentDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Document expiration date',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDocumentDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=create-document.dto.js.map