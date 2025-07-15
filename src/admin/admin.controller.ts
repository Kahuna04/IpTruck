import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt_at.guard';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DocumentVerificationDto } from './dto/document-verification.dto';
import { User, Document, Bid } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // User Management Endpoints
  @Get('users')
  async getAllUsers(): Promise<User[]> {
    return await this.adminService.getAllUsers();
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.adminService.getUserById(id);
  }

  @Post('users/admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<User> {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.adminService.updateUser(id, updateUserDto);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.adminService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  @Put('users/:id/suspend')
  async suspendUser(@Param('id') id: string): Promise<User> {
    return await this.adminService.suspendUser(id);
  }

  @Put('users/:id/activate')
  async activateUser(@Param('id') id: string): Promise<User> {
    return await this.adminService.activateUser(id);
  }

  // Document Management Endpoints
  @Get('documents')
  async getAllDocuments(): Promise<Document[]> {
    return await this.adminService.getAllDocuments();
  }

  @Get('documents/pending')
  async getPendingDocuments(): Promise<Document[]> {
    return await this.adminService.getPendingDocuments();
  }

  @Put('documents/:id/verify')
  async verifyDocument(
    @Param('id') id: string,
    @Body() verificationDto: DocumentVerificationDto,
  ): Promise<Document> {
    return await this.adminService.verifyDocument(id, verificationDto);
  }

  @Delete('documents/:id')
  async deleteDocument(@Param('id') id: string): Promise<{ message: string }> {
    await this.adminService.deleteDocument(id);
    return { message: 'Document deleted successfully' };
  }

  // Bid Management Endpoints
  @Get('bids')
  async getAllBids(): Promise<Bid[]> {
    return await this.adminService.getAllBids();
  }

  @Get('bids/:id')
  async getBidById(@Param('id') id: string): Promise<Bid> {
    return await this.adminService.getBidById(id);
  }

  @Delete('bids/:id')
  async deleteBid(@Param('id') id: string): Promise<{ message: string }> {
    await this.adminService.deleteBid(id);
    return { message: 'Bid deleted successfully' };
  }

  // Analytics and Reports Endpoints
  @Get('dashboard/stats')
  async getDashboardStats(): Promise<any> {
    return await this.adminService.getDashboardStats();
  }

  @Get('users/registered')
  async getUsersRegisteredInDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<User[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await this.adminService.getUsersRegisteredInDateRange(start, end);
  }

  @Get('activity/recent')
  async getRecentActivity(): Promise<any> {
    return await this.adminService.getRecentActivity();
  }
}
