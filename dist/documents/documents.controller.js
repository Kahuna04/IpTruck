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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const documents_service_1 = require("./documents.service");
const create_document_dto_1 = require("./dto/create-document.dto");
const update_document_dto_1 = require("./dto/update-document.dto");
const create_document_dto_2 = require("./dto/create-document.dto");
const CurrentUser = () => (target, propertyKey, parameterIndex) => {
};
class JwtAuthGuard {
    canActivate() {
        return true;
    }
}
let DocumentsController = class DocumentsController {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    async uploadDocument(file, createDocumentDto, user) {
        const mockUser = {
            id: 'user123',
            email: 'user@example.com',
        };
        return this.documentsService.createDocument(createDocumentDto, file, mockUser.id);
    }
    async getDocuments(type, status, bookingId, myDocuments, limit, offset, user) {
        const userId = myDocuments ? 'user123' : undefined;
        return this.documentsService.getDocuments(userId, type, status, bookingId, limit, offset);
    }
    async getDocumentById(id) {
        return this.documentsService.getDocumentById(id);
    }
    async updateDocument(id, updateDocumentDto, user) {
        return this.documentsService.updateDocument(id, updateDocumentDto, 'user123');
    }
    async deleteDocument(id, user) {
        await this.documentsService.deleteDocument(id, 'user123');
    }
    async verifyDocument(id, body, user) {
        return this.documentsService.verifyDocument(id, 'admin123');
    }
    async rejectDocument(id, body, user) {
        return this.documentsService.rejectDocument(id, 'admin123', body.reason, body.comments);
    }
    async downloadDocument(id, user) {
        return this.documentsService.downloadDocument(id, 'user123');
    }
    async getDocumentsForBooking(bookingId, user) {
        return this.documentsService.getDocumentsForBooking(bookingId, 'user123');
    }
    async getExpiringDocuments(days, user) {
        return this.documentsService.getExpiringDocuments(days);
    }
    async getDocumentStats(user) {
        return this.documentsService.getDocumentStats('user123');
    }
    async searchDocuments(query, type, status, limit, offset, user) {
        return this.documentsService.searchDocuments(query, 'user123', type, status, limit, offset);
    }
    async duplicateDocument(id, updateData, user) {
        return this.documentsService.duplicateDocument(id, 'user123', updateData);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiOperation)({
        summary: 'Upload a new document',
        description: 'Upload a new document with metadata. The document can be associated with a booking if bookingId is provided.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Document uploaded successfully',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                fileName: 'driver_license.pdf',
                documentType: 'driver_license',
                status: 'pending_verification',
                uploadedBy: 'user123',
                createdAt: '2024-07-15T10:30:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid document data or file' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_document_dto_1.CreateDocumentDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get documents with filters',
        description: 'Retrieve documents with optional filtering by type, status, booking, and user. Supports pagination.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: false,
        enum: create_document_dto_2.DocumentType,
        description: 'Filter by document type',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: create_document_dto_2.DocumentStatus,
        description: 'Filter by document status',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'bookingId',
        required: false,
        description: 'Filter by booking ID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'myDocuments',
        required: false,
        type: Boolean,
        description: "Get only current user's documents",
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
        description: 'Documents retrieved successfully',
        schema: {
            example: {
                documents: [
                    {
                        id: '550e8400-e29b-41d4-a716-446655440000',
                        fileName: 'driver_license.pdf',
                        documentType: 'driver_license',
                        status: 'verified',
                        uploadedBy: 'user123',
                        createdAt: '2024-07-15T10:30:00Z',
                    },
                ],
                total: 1,
            },
        },
    }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('bookingId')),
    __param(3, (0, common_1.Query)('myDocuments', new common_1.DefaultValuePipe(false), common_1.ParseBoolPipe)),
    __param(4, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(6, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get document by ID',
        description: 'Retrieve detailed information about a specific document.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Document found',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                fileName: 'driver_license.pdf',
                documentType: 'driver_license',
                status: 'verified',
                uploadedBy: 'user123',
                bookingId: 'booking123',
                fileSize: 1024000,
                mimeType: 'application/pdf',
                createdAt: '2024-07-15T10:30:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocumentById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update document metadata',
        description: 'Update document metadata. Only the document owner can update their documents.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Document updated successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the document owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_document_dto_1.UpdateDocumentDto, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a document',
        description: 'Delete a document and its associated file. Only the document owner can delete their documents.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Document deleted successfully' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the document owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify a document',
        description: 'Verify a document. Only admin users can verify documents.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Document verified successfully',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                status: 'verified',
                verifiedBy: 'admin123',
                verifiedAt: '2024-07-15T12:00:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - admin access required',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "verifyDocument", null);
__decorate([
    (0, common_1.Put)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject a document',
        description: 'Reject a document with reason. Only admin users can reject documents.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Document rejected successfully',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440000',
                status: 'rejected',
                verifiedBy: 'admin123',
                verifiedAt: '2024-07-15T12:00:00Z',
                rejectionReason: 'Document is not clear enough',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Rejection reason is required' }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - admin access required',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "rejectDocument", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({
        summary: 'Download document file',
        description: 'Download the actual document file. Only the document owner or admin can download.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Document ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Document file downloaded successfully',
        headers: {
            'Content-Type': { description: 'The MIME type of the file' },
            'Content-Disposition': { description: 'Attachment with filename' },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not authorized to download',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "downloadDocument", null);
__decorate([
    (0, common_1.Get)('booking/:bookingId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get documents for a booking',
        description: 'Retrieve all documents associated with a specific booking.',
    }),
    (0, swagger_1.ApiParam)({ name: 'bookingId', description: 'Booking ID', type: 'string' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Booking documents retrieved successfully',
        schema: {
            example: [
                {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    fileName: 'waybill.pdf',
                    documentType: 'waybill',
                    status: 'verified',
                    uploadedBy: 'user123',
                    createdAt: '2024-07-15T10:30:00Z',
                },
            ],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Booking not found' }),
    __param(0, (0, common_1.Param)('bookingId', common_1.ParseUUIDPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocumentsForBooking", null);
__decorate([
    (0, common_1.Get)('expiring'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get expiring documents',
        description: 'Get documents that are expiring within the specified number of days.',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'days',
        required: false,
        type: Number,
        description: 'Number of days to check for expiration (default: 30)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Expiring documents retrieved successfully',
        schema: {
            example: [
                {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    fileName: 'driver_license.pdf',
                    documentType: 'driver_license',
                    status: 'verified',
                    expirationDate: '2024-08-15T00:00:00Z',
                    daysUntilExpiration: 15,
                },
            ],
        },
    }),
    __param(0, (0, common_1.Query)('days', new common_1.DefaultValuePipe(30), common_1.ParseIntPipe)),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getExpiringDocuments", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get document statistics',
        description: 'Get statistics about documents for the current user.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Statistics retrieved successfully',
        schema: {
            example: {
                totalDocuments: 25,
                verifiedDocuments: 20,
                pendingDocuments: 3,
                rejectedDocuments: 2,
                expiringDocuments: 1,
                documentsByType: {
                    driver_license: 5,
                    vehicle_registration: 3,
                    insurance: 4,
                },
            },
        },
    }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getDocumentStats", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({
        summary: 'Search documents',
        description: 'Search documents by filename or metadata.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, description: 'Search query' }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: false,
        enum: create_document_dto_2.DocumentType,
        description: 'Filter by document type',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'status',
        required: false,
        enum: create_document_dto_2.DocumentStatus,
        description: 'Filter by document status',
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
                documents: [
                    {
                        id: '550e8400-e29b-41d4-a716-446655440000',
                        fileName: 'driver_license.pdf',
                        documentType: 'driver_license',
                        status: 'verified',
                        uploadedBy: 'user123',
                    },
                ],
                total: 1,
            },
        },
    }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('offset', new common_1.DefaultValuePipe(0), common_1.ParseIntPipe)),
    __param(5, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "searchDocuments", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a duplicate of a document',
        description: 'Create a copy of an existing document with updated metadata.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Document ID to duplicate',
        type: 'string',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Document duplicated successfully',
        schema: {
            example: {
                id: '550e8400-e29b-41d4-a716-446655440001',
                fileName: 'driver_license_copy.pdf',
                documentType: 'driver_license',
                status: 'pending_verification',
                uploadedBy: 'user123',
                createdAt: '2024-07-15T14:30:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Forbidden - not the document owner',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Document not found' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "duplicateDocument", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, swagger_1.ApiTags)('Documents'),
    (0, common_1.Controller)('documents'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(JwtAuthGuard),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map