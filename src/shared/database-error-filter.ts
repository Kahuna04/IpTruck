import { 
  ExceptionFilter, 
  Catch, 
  ArgumentsHost, 
  HttpStatus, 
  HttpException,
  Logger 
} from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch()
export class DatabaseErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseErrorFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      details = exception.getResponse();
    } else if (exception instanceof PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      
      switch (exception.code) {
        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'A record with this information already exists';
          details = {
            code: 'DUPLICATE_RECORD',
            target: exception.meta?.target || [],
          };
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          details = {
            code: 'RECORD_NOT_FOUND',
            cause: exception.meta?.cause || 'Unknown',
          };
          break;
        case 'P2003':
          status = HttpStatus.BAD_REQUEST;
          message = 'Foreign key constraint failed';
          details = {
            code: 'FOREIGN_KEY_CONSTRAINT',
            field: exception.meta?.field_name || 'unknown',
          };
          break;
        case 'P2014':
          status = HttpStatus.BAD_REQUEST;
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
    } else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid data provided';
      details = {
        code: 'VALIDATION_ERROR',
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      message = exception.message;
      details = {
        code: 'UNKNOWN_ERROR',
        stack: process.env.NODE_ENV === 'development' ? exception.stack : undefined,
      };
    }

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : exception
    );

    response.status(status).json({
      statusCode: status,
      message,
      details,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
