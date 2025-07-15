import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ParseBoolPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';
import { DocumentType, DocumentStatus } from './dto/create-document.dto';

// Mock decorator for current user - replace with actual auth implementation
const CurrentUser = () => (target: any, propertyKey: string, parameterIndex: number) => {
  // This would be replaced with actual user extraction from JWT token
};

// Mock auth guard - replace with actual implementation
class JwtAuthGuard {
  canActivate() {
    return true; // Mock implementation
  }
}

@ApiTags('Documents')
@Controller('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ 
    summary: 'Upload a new document',
    description: 'Upload a new document with metadata. The document can be associated with a booking if bookingId is provided.'
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ 
    status: 201, 
    description: 'Document uploaded successfully',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        fileName: 'driver_license.pdf',
        documentType: 'driver_license',
        status: 'pending_verification',
        uploadedBy: 'user123',
        createdAt: '2024-07-15T10:30:00Z'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid document data or file' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentDto: CreateDocumentDto,
    @CurrentUser() user: any // Replace with actual user type
  ): Promise<Document> {
    // Mock user data - replace with actual user from auth
    const mockUser = {
      id: 'user123',
      email: 'user@example.com'
    };
    
    return this.documentsService.createDocument(createDocumentDto, file, mockUser.id);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get documents with filters',
    description: 'Retrieve documents with optional filtering by type, status, booking, and user. Supports pagination.'
  })
  @ApiQuery({ name: 'type', required: false, enum: DocumentType, description: 'Filter by document type' })
  @ApiQuery({ name: 'status', required: false, enum: DocumentStatus, description: 'Filter by document status' })
  @ApiQuery({ name: 'bookingId', required: false, description: 'Filter by booking ID' })
  @ApiQuery({ name: 'myDocuments', required: false, type: Boolean, description: 'Get only current user\'s documents' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results per page (default: 20)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Number of results to skip (default: 0)' })
  @ApiResponse({ 
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
            createdAt: '2024-07-15T10:30:00Z'
          }
        ],
        total: 1
      }
    }
  })
  async getDocuments(
    @Query('type') type?: DocumentType,
    @Query('status') status?: DocumentStatus,
    @Query('bookingId') bookingId?: string,
    @Query('myDocuments', new DefaultValuePipe(false), ParseBoolPipe) myDocuments?: boolean,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
    @CurrentUser() user: any
  ): Promise<{ documents: Document[]; total: number }> {
    const userId = myDocuments ? 'user123' : undefined; // Replace with actual user ID
    
    return this.documentsService.getDocuments(
      userId,
      type,
      status,
      bookingId,
      limit,
      offset
    );
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get document by ID',
    description: 'Retrieve detailed information about a specific document.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ 
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
        createdAt: '2024-07-15T10:30:00Z'
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async getDocumentById(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Document> {
    return this.documentsService.getDocumentById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Update document metadata',
    description: 'Update document metadata. Only the document owner can update their documents.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Document updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the document owner' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @CurrentUser() user: any
  ): Promise<Document> {
    return this.documentsService.updateDocument(id, updateDocumentDto, 'user123'); // Replace with actual user ID
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Delete a document',
    description: 'Delete a document and its associated file. Only the document owner can delete their documents.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ status: 204, description: 'Document deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - not the document owner' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async deleteDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any
  ): Promise<void> {
    await this.documentsService.deleteDocument(id, 'user123'); // Replace with actual user ID
  }

  @Put(':id/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Verify a document',
    description: 'Verify a document. Only admin users can verify documents.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ 
    status: 200, 
    description: 'Document verified successfully',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'verified',
        verifiedBy: 'admin123',
        verifiedAt: '2024-07-15T12:00:00Z'
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async verifyDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { comments?: string },
    @CurrentUser() user: any
  ): Promise<Document> {
    return this.documentsService.verifyDocument(id, 'admin123', body.comments); // Replace with actual admin user ID
  }

  @Put(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Reject a document',
    description: 'Reject a document with reason. Only admin users can reject documents.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ 
    status: 200, 
    description: 'Document rejected successfully',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        status: 'rejected',
        verifiedBy: 'admin123',
        verifiedAt: '2024-07-15T12:00:00Z',
        rejectionReason: 'Document is not clear enough'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Rejection reason is required' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async rejectDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reason: string; comments?: string },
    @CurrentUser() user: any
  ): Promise<Document> {
    return this.documentsService.rejectDocument(id, 'admin123', body.reason, body.comments); // Replace with actual admin user ID
  }

  @Get(':id/download')
  @ApiOperation({ 
    summary: 'Download document file',
    description: 'Download the actual document file. Only the document owner or admin can download.'
  })
  @ApiParam({ name: 'id', description: 'Document ID', type: 'string' })
  @ApiResponse({ 
    status: 200, 
    description: 'Document file downloaded successfully',
    headers: {
      'Content-Type': { description: 'The MIME type of the file' },
      'Content-Disposition': { description: 'Attachment with filename' }
    }
  })
  @ApiResponse({ status: 403, description: 'Forbidden - not authorized to download' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async downloadDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any
  ): Promise<{ buffer: Buffer; filename: string; mimeType: string }> {
    return this.documentsService.downloadDocument(id, 'user123'); // Replace with actual user ID
  }

  @Get('booking/:bookingId')
  @ApiOperation({ 
    summary: 'Get documents for a booking',
    description: 'Retrieve all documents associated with a specific booking.'
  })
  @ApiParam({ name: 'bookingId', description: 'Booking ID', type: 'string' })
  @ApiResponse({ 
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
          createdAt: '2024-07-15T10:30:00Z'
        }
      ]
    }
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getDocumentsForBooking(
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
    @CurrentUser() user: any
  ): Promise<Document[]> {
    return this.documentsService.getDocumentsForBooking(bookingId, 'user123'); // Replace with actual user ID
  }

  @Get('expiring')
  @ApiOperation({ 
    summary: 'Get expiring documents',
    description: 'Get documents that are expiring within the specified number of days.'
  })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days to check for expiration (default: 30)' })
  @ApiResponse({ 
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
          daysUntilExpiration: 15
        }
      ]
    }
  })
  async getExpiringDocuments(
    @Query('days', new DefaultValuePipe(30), ParseIntPipe) days?: number,
    @CurrentUser() user: any
  ): Promise<Document[]> {
    return this.documentsService.getExpiringDocuments(days, 'user123'); // Replace with actual user ID
  }

  @Get('stats')
  @ApiOperation({ 
    summary: 'Get document statistics',
    description: 'Get statistics about documents for the current user.'
  })
  @ApiResponse({ 
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
          insurance: 4
        }
      }
    }
  })
  async getDocumentStats(@CurrentUser() user: any): Promise<{
    totalDocuments: number;
    verifiedDocuments: number;
    pendingDocuments: number;
    rejectedDocuments: number;
    expiringDocuments: number;
    documentsByType: Record<string, number>;
  }> {
    return this.documentsService.getDocumentStats('user123'); // Replace with actual user ID
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Search documents',
    description: 'Search documents by filename or metadata.'
  })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  @ApiQuery({ name: 'type', required: false, enum: DocumentType, description: 'Filter by document type' })
  @ApiQuery({ name: 'status', required: false, enum: DocumentStatus, description: 'Filter by document status' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results (default: 20)' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Results offset (default: 0)' })
  @ApiResponse({ 
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
            uploadedBy: 'user123'
          }
        ],
        total: 1
      }
    }
  })
  async searchDocuments(
    @Query('q') query: string,
    @Query('type') type?: DocumentType,
    @Query('status') status?: DocumentStatus,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
    @CurrentUser() user: any
  ): Promise<{ documents: Document[]; total: number }> {
    return this.documentsService.searchDocuments(
      query,
      'user123', // Replace with actual user ID
      type,
      status,
      limit,
      offset
    );
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create a duplicate of a document',
    description: 'Create a copy of an existing document with updated metadata.'
  })
  @ApiParam({ name: 'id', description: 'Document ID to duplicate', type: 'string' })
  @ApiResponse({ 
    status: 201, 
    description: 'Document duplicated successfully',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440001',
        fileName: 'driver_license_copy.pdf',
        documentType: 'driver_license',
        status: 'pending_verification',
        uploadedBy: 'user123',
        createdAt: '2024-07-15T14:30:00Z'
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Forbidden - not the document owner' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async duplicateDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: Partial<CreateDocumentDto>,
    @CurrentUser() user: any
  ): Promise<Document> {
    return this.documentsService.duplicateDocument(id, 'user123', updateData); // Replace with actual user ID
  }
}
