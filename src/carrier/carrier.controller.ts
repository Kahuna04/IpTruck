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
  ParseFloatPipe,
} from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { JwtGuard } from '../auth/guards/jwt_at.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Carrier')
@Controller('carrier')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new carrier profile' })
  @ApiResponse({
    status: 201,
    description: 'Carrier profile created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createCarrierDto: CreateCarrierDto, @Req() req: Request) {
    const userId = req.user?.['sub'];
    return this.carrierService.create(createCarrierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all carriers with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of carriers retrieved successfully',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.carrierService.findAll(page, limit);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search carriers' })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
  })
  search(
    @Query('q') query: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.carrierService.search(query, page, limit);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user carrier profile' })
  @ApiResponse({
    status: 200,
    description: 'Carrier profile retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Carrier profile not found' })
  getMyProfile(@Req() req: Request) {
    const userId = req.user?.['sub'];
    return this.carrierService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get carrier by ID' })
  @ApiResponse({ status: 200, description: 'Carrier retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  findOne(@Param('id') id: string) {
    return this.carrierService.findOne(id);
  }

  @Get(':id/statistics')
  @ApiOperation({ summary: 'Get carrier statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  getStatistics(@Param('id') id: string) {
    return this.carrierService.getStatistics(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update carrier profile' })
  @ApiResponse({ status: 200, description: 'Carrier updated successfully' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  update(@Param('id') id: string, @Body() updateCarrierDto: UpdateCarrierDto) {
    return this.carrierService.update(id, updateCarrierDto);
  }

  @Patch(':id/rating')
  @ApiOperation({ summary: 'Update carrier rating' })
  @ApiResponse({ status: 200, description: 'Rating updated successfully' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  updateRating(
    @Param('id') id: string,
    @Body('rating', ParseFloatPipe) rating: number,
  ) {
    return this.carrierService.updateRating(id, rating);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete carrier' })
  @ApiResponse({ status: 204, description: 'Carrier deleted successfully' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  remove(@Param('id') id: string) {
    return this.carrierService.remove(id);
  }

  // Truck management endpoints
  @Post(':id/trucks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a truck to carrier fleet' })
  @ApiResponse({ status: 201, description: 'Truck added successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  addTruck(
    @Param('id') carrierId: string,
    @Body() createTruckDto: CreateTruckDto,
  ) {
    return this.carrierService.addTruck(carrierId, createTruckDto);
  }

  @Get(':id/trucks')
  @ApiOperation({ summary: 'Get all trucks for a carrier' })
  @ApiResponse({ status: 200, description: 'Trucks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Carrier not found' })
  getTrucks(@Param('id') carrierId: string) {
    return this.carrierService.getTrucks(carrierId);
  }

  @Get('trucks/:truckId')
  @ApiOperation({ summary: 'Get truck by ID' })
  @ApiResponse({ status: 200, description: 'Truck retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Truck not found' })
  getTruckById(@Param('truckId') truckId: string) {
    return this.carrierService.getTruckById(truckId);
  }

  @Patch('trucks/:truckId')
  @ApiOperation({ summary: 'Update truck information' })
  @ApiResponse({ status: 200, description: 'Truck updated successfully' })
  @ApiResponse({ status: 404, description: 'Truck not found' })
  updateTruck(
    @Param('truckId') truckId: string,
    @Body() updateTruckDto: UpdateTruckDto,
  ) {
    return this.carrierService.updateTruck(truckId, updateTruckDto);
  }

  @Delete('trucks/:truckId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete truck' })
  @ApiResponse({ status: 204, description: 'Truck deleted successfully' })
  @ApiResponse({ status: 404, description: 'Truck not found' })
  removeTruck(@Param('truckId') truckId: string) {
    return this.carrierService.removeTruck(truckId);
  }
}
