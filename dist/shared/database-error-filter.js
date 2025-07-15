"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseErrorFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
let DatabaseErrorFilter = DatabaseErrorFilter_1 = class DatabaseErrorFilter {
    logger = new common_1.Logger(DatabaseErrorFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let details = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            message = exception.message;
            details = exception.getResponse();
        }
        else if (exception instanceof library_1.PrismaClientKnownRequestError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            switch (exception.code) {
                case 'P2002':
                    status = common_1.HttpStatus.CONFLICT;
                    message = 'A record with this information already exists';
                    details = {
                        code: 'DUPLICATE_RECORD',
                        target: exception.meta?.target || [],
                    };
                    break;
                case 'P2025':
                    status = common_1.HttpStatus.NOT_FOUND;
                    message = 'Record not found';
                    details = {
                        code: 'RECORD_NOT_FOUND',
                        cause: exception.meta?.cause || 'Unknown',
                    };
                    break;
                case 'P2003':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'Foreign key constraint failed';
                    details = {
                        code: 'FOREIGN_KEY_CONSTRAINT',
                        field: exception.meta?.field_name || 'unknown',
                    };
                    break;
                case 'P2014':
                    status = common_1.HttpStatus.BAD_REQUEST;
                    message = 'The change would violate a required relation';
                    details = {
                        code: 'RELATION_VIOLATION',
                        relation: exception.meta?.relation_name || 'unknown',
                    };
                    break;
                default:
                    message = 'Database operation failed';
                    details = {
                        code: exception.code,
                        message: exception.message,
                    };
            }
        }
        else if (exception instanceof library_1.PrismaClientValidationError) {
            status = common_1.HttpStatus.BAD_REQUEST;
            message = 'Invalid data provided';
            details = {
                code: 'VALIDATION_ERROR',
                message: exception.message,
            };
        }
        else if (exception instanceof Error) {
            message = exception.message;
            details = {
                code: 'UNKNOWN_ERROR',
                stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
            };
        }
        this.logger.error(`${request.method} ${request.url} - ${status} - ${message}`, exception instanceof Error ? exception.stack : exception);
        response.status(status).json({
            statusCode: status,
            message,
            details,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.DatabaseErrorFilter = DatabaseErrorFilter;
exports.DatabaseErrorFilter = DatabaseErrorFilter = DatabaseErrorFilter_1 = __decorate([
    (0, common_1.Catch)()
], DatabaseErrorFilter);
//# sourceMappingURL=database-error-filter.js.map