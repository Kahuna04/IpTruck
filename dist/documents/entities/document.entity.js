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
exports.Document = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class Document {
    id;
    type;
    status;
    fileName;
    originalName;
    fileUrl;
    fileSize;
    mimeType;
    bookingId;
    bidId;
    carrierId;
    uploadedById;
    billOfLadingId;
    metadata;
    expiresAt;
    verifiedAt;
    verifiedById;
    createdAt;
    updatedAt;
}
exports.Document = Document;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document ID' }),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document type', enum: client_1.DocumentType }),
    __metadata("design:type", String)
], Document.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document status', enum: client_1.DocumentStatus }),
    __metadata("design:type", String)
], Document.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File name' }),
    __metadata("design:type", String)
], Document.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Original file name' }),
    __metadata("design:type", String)
], Document.prototype, "originalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File URL' }),
    __metadata("design:type", String)
], Document.prototype, "fileUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'File size in bytes' }),
    __metadata("design:type", Number)
], Document.prototype, "fileSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'MIME type' }),
    __metadata("design:type", String)
], Document.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated booking ID', required: false }),
    __metadata("design:type", String)
], Document.prototype, "bookingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated bid ID', required: false }),
    __metadata("design:type", String)
], Document.prototype, "bidId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated carrier ID', required: false }),
    __metadata("design:type", String)
], Document.prototype, "carrierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Uploaded by user ID' }),
    __metadata("design:type", String)
], Document.prototype, "uploadedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bill of lading ID', required: false }),
    __metadata("design:type", String)
], Document.prototype, "billOfLadingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document metadata', required: false }),
    __metadata("design:type", Object)
], Document.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document expiration date', required: false }),
    __metadata("design:type", Date)
], Document.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Document verification date', required: false }),
    __metadata("design:type", Date)
], Document.prototype, "verifiedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Verified by user ID', required: false }),
    __metadata("design:type", String)
], Document.prototype, "verifiedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp' }),
    __metadata("design:type", Date)
], Document.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Update timestamp' }),
    __metadata("design:type", Date)
], Document.prototype, "updatedAt", void 0);
//# sourceMappingURL=document.entity.js.map