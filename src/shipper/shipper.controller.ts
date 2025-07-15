import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { JwtGuard } from '../auth/guards/jwt_at.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Shipper')
@Controller('shipper')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class ShipperController {
  constructor(private readonly shipperService: ShipperService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new shipper profile' })
  @ApiResponse({ status: 201, description: 'Shipper profile created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createShipperDto: CreateShipperDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.shipperService.create(createShipperDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shippers with pagination' })
  @ApiResponse({ status: 200, description: 'List of shippers retrieved successfully' })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.shipperService.findAll(page, limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search shippers' })
  @ApiResponse({ status: 200, description: 'Search results retrieved successfully' })
  search(
    @Query('q') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.shipperService.search(query, page, limit);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user shipper profile' })
  @ApiResponse({ status: 200, description: 'Shipper profile retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Shipper profile not found' })
  getMyProfile(@Req() req: Request) {
    const userId = req.user['sub'];
    return this.shipperService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get shipper by ID' })
  @ApiResponse({ status: 200, description: 'Shipper retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Shipper not found' })
  findOne(@Param('id') id: string) {
    return this.shipperService.findOne(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get shipper statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Shipper not found' })
  getStatistics(@Param('id') id: string) {
    return this.shipperService.getStatistics(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update shipper profile' })
  @ApiResponse({ status: 200, description: 'Shipper updated successfully' })
  @ApiResponse({ status: 404, description: 'Shipper not found' })
  update(@Param('id') id: string, @Body() updateShipperDto: UpdateShipperDto) {
    return this.shipperService.update(id, updateShipperDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete shipper' })
  @ApiResponse({ status: 204, description: 'Shipper deleted successfully' })
  @ApiResponse({ status: 404, description: 'Shipper not found' })
  remove(@Param('id') id: string) {
    return this.shipperService.remove(id);
  }
}
