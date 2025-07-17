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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import {
  BookingService,
  BookingStatus,
  BookingEntity,
  BidEntity,
} from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  CreateBidDto,
  UpdateBidDto,
  BidResponseDto,
} from '../bidding/dto/create-bid.dto';

// Mock decorator for current user - replace with actual auth implementation
const CurrentUser =
  () => (target: any, propertyKey: string, parameterIndex: number) => {
    // This would be replaced with actual user extraction from JWT token
  };

// Mock auth guard - replace with actual implementation
class JwtAuthGuard {
  canActivate() {
    return true; // Mock implementation
  }
}

@ApiTags('Bookings')
@Controller('bookings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new truck booking',
    description:
      'Creates a new booking request for truck transportation. The booking will be made available to carriers who can then submit bids.',
  })
  @ApiResponse({
    status: 201,
    description: 'Booking created successfully',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        shipperId: 'user123',
        shipperCompany: 'Coca-Cola Nigeria',
        description: 'Coca-Cola distribution to retailers',
        status: 'active',
        createdAt: '2024-07-15T10:30:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid booking data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @CurrentUser() user: any, // Replace with actual user type
  ): Promise<any> {
    // Mock user data - replace with actual user from auth
    const mockUser = {
      id: 'user123',
      companyName: 'Coca-Cola Nigeria',
    };

    return this.bookingService.createBooking(createBookingDto, mockUser.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get bookings with filters',
    description:
      'Retrieve bookings with optional filtering by status, urgency, truck type, and location. Supports pagination.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: BookingStatus,
    description: 'Filter by booking status',
  })
  @ApiQuery({
    name: 'urgencyLevel',
    required: false,
    description:
      'Filter by urgency level (low, medium, high, urgent, emergency)',
  })
  @ApiQuery({
    name: 'truckType',
    required: false,
    description: 'Filter by preferred truck type',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    description: 'Filter by pickup or delivery location',
  })
  @ApiQuery({
    name: 'myBookings',
    required: false,
    type: Boolean,
    description: "Get only current user's bookings",
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of results per page (default: 20)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of results to skip (default: 0)',
  })
  @ApiResponse({
    status: 200,
    description: 'Bookings retrieved successfully',
    schema: {
      example: {
        bookings: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            description: 'Coca-Cola distribution to retailers',
            status: 'active',
            urgencyLevel: 'high',
            proposedPrice: 150000,
            bids: [],
          },
        ],
        total: 1,
      },
    },
  })
  async getBookings(
    @Query('status') status?: BookingStatus,
    @Query('urgencyLevel') urgencyLevel?: string,
    @Query('truckType') truckType?: string,
    @Query('location') location?: string,
    @Query('myBookings') myBookings?: boolean,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
    @CurrentUser() user?: any,
  ): Promise<{ bookings: BookingEntity[]; total: number }> {
    const userId = myBookings ? 'user123' : undefined; // Replace with actual user ID

    return this.bookingService.getBookings(
      userId,
      status,
      urgencyLevel,
      truckType,
      location,
      limit,
      offset,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get booking by ID',
    description:
      'Retrieve detailed information about a specific booking including all bids received.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking found',
    schema: {
      example: {
        id: '550e8400-e29b-41d4-a716-446655440000',
        description: 'Coca-Cola distribution to retailers',
        status: 'bids_received',
        bids: [
          {
            id: 'bid123',
            bidAmount: 145000,
            status: 'pending',
            truckDetails: { makeModel: 'Mercedes Actros' },
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BookingEntity> {
    return this.bookingService.getBookingById(id);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Update booking status',
    description:
      'Update the status of a booking. Only the booking creator can update the status.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Booking status updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not the booking owner',
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async updateBookingStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { status: BookingStatus },
    @CurrentUser() user: any,
  ): Promise<BookingEntity> {
    return this.bookingService.updateBookingStatus(id, body.status, 'user123'); // Replace with actual user ID
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Cancel a booking',
    description:
      'Cancel a booking and notify all bidders. Only the booking creator can cancel.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({ status: 204, description: 'Booking cancelled successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not the booking owner',
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async cancelBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reason?: string },
    @CurrentUser() user: any,
  ): Promise<void> {
    await this.bookingService.cancelBooking(id, 'user123', body.reason); // Replace with actual user ID
  }

  @Get(':id/bids')
  @ApiOperation({
    summary: 'Get bids for a booking',
    description:
      'Retrieve all bids submitted for a specific booking. Only the booking creator can view bids.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bids retrieved successfully',
    schema: {
      example: [
        {
          id: 'bid123',
          bidAmount: 145000,
          status: 'pending',
          truckDetails: { makeModel: 'Mercedes Actros', year: 2020 },
          driverDetails: { fullName: 'John Doe', experienceYears: 8 },
        },
      ],
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not the booking owner',
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBidsForBooking(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ): Promise<BidEntity[]> {
    return this.bookingService.getBidsForBooking(id, 'user123'); // Replace with actual user ID
  }

  @Post(':id/bids')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Submit a bid for a booking',
    description:
      'Submit a bid for a truck booking. Only carriers can submit bids.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 201,
    description: 'Bid submitted successfully',
    schema: {
      example: {
        id: 'bid123',
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        bidAmount: 145000,
        status: 'pending',
        createdAt: '2024-07-15T11:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid bid data or booking not accepting bids',
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createBid(
    @Param('id', ParseUUIDPipe) bookingId: string,
    @Body() createBidDto: CreateBidDto,
    @CurrentUser() user: any,
  ): Promise<BidEntity> {
    // Ensure the booking ID in the DTO matches the URL parameter
    createBidDto.bookingId = bookingId;

    // Mock user data - replace with actual user from auth
    const mockUser = {
      id: 'carrier123',
      companyName: 'Swift Logistics Ltd',
    };

    return this.bookingService.createBid(createBidDto, mockUser.id);
  }

  @Get('my-bids')
  @ApiOperation({
    summary: "Get current user's bids",
    description:
      'Retrieve all bids submitted by the current user across all bookings.',
  })
  @ApiResponse({
    status: 200,
    description: 'User bids retrieved successfully',
    schema: {
      example: [
        {
          id: 'bid123',
          bookingId: '550e8400-e29b-41d4-a716-446655440000',
          bidAmount: 145000,
          status: 'pending',
        },
      ],
    },
  })
  async getUserBids(@CurrentUser() user: any): Promise<BidEntity[]> {
    return this.bookingService.getUserBids('carrier123'); // Replace with actual user ID
  }

  @Put('bids/:bidId')
  @ApiOperation({
    summary: 'Update a bid',
    description:
      'Update a pending bid. Only the bid creator can update their bid.',
  })
  @ApiParam({ name: 'bidId', description: 'Bid ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Bid updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bid cannot be updated (not pending)',
  })
  @ApiResponse({ status: 403, description: 'Forbidden - not the bid owner' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateBid(
    @Param('bidId', ParseUUIDPipe) bidId: string,
    @Body() updateBidDto: UpdateBidDto,
    @CurrentUser() user: any,
  ): Promise<BidEntity> {
    return this.bookingService.updateBid(bidId, updateBidDto, 'carrier123'); // Replace with actual user ID
  }

  @Post('bids/:bidId/respond')
  @ApiOperation({
    summary: 'Respond to a bid',
    description:
      'Accept, reject, or counter-offer a bid. Only the booking creator can respond to bids.',
  })
  @ApiParam({ name: 'bidId', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid response submitted successfully',
    schema: {
      example: {
        id: 'bid123',
        status: 'accepted',
        updatedAt: '2024-07-15T12:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not the booking owner',
  })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async respondToBid(
    @Param('bidId', ParseUUIDPipe) bidId: string,
    @Body() bidResponseDto: BidResponseDto,
    @CurrentUser() user: any,
  ): Promise<BidEntity> {
    return this.bookingService.respondToBid(bidId, bidResponseDto, 'user123'); // Replace with actual user ID
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Get booking statistics',
    description:
      'Get statistics for the current user including booking and bid counts.',
  })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    schema: {
      example: {
        totalBookings: 15,
        activeBookings: 3,
        completedBookings: 10,
        totalBids: 25,
        acceptedBids: 8,
        pendingBids: 5,
      },
    },
  })
  async getBookingStats(@CurrentUser() user: any): Promise<{
    totalBookings: number;
    activeBookings: number;
    completedBookings: number;
    totalBids: number;
    acceptedBids: number;
    pendingBids: number;
  }> {
    return this.bookingService.getBookingStats('user123'); // Replace with actual user ID
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search available bookings',
    description:
      'Search for available bookings based on various criteria. Useful for carriers looking for loads.',
  })
  @ApiQuery({
    name: 'pickupCity',
    required: false,
    description: 'Filter by pickup city',
  })
  @ApiQuery({
    name: 'deliveryCity',
    required: false,
    description: 'Filter by delivery city',
  })
  @ApiQuery({
    name: 'truckType',
    required: false,
    description: 'Filter by required truck type',
  })
  @ApiQuery({
    name: 'urgencyLevel',
    required: false,
    description: 'Filter by urgency level',
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    type: Number,
    description: 'Minimum price filter',
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    type: Number,
    description: 'Maximum price filter',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of results (default: 20)',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Results offset (default: 0)',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    schema: {
      example: {
        bookings: [
          {
            id: '550e8400-e29b-41d4-a716-446655440000',
            description: 'Coca-Cola distribution',
            pickupLocation: { city: 'Lagos', state: 'Lagos State' },
            deliveryLocation: { city: 'Abuja', state: 'FCT' },
            proposedPrice: 150000,
            urgencyLevel: 'high',
          },
        ],
        total: 1,
      },
    },
  })
  async searchBookings(
    @Query('pickupCity') pickupCity?: string,
    @Query('deliveryCity') deliveryCity?: string,
    @Query('truckType') truckType?: string,
    @Query('urgencyLevel') urgencyLevel?: string,
    @Query('minPrice', new DefaultValuePipe(0), ParseIntPipe) minPrice?: number,
    @Query(
      'maxPrice',
      new DefaultValuePipe(Number.MAX_SAFE_INTEGER),
      ParseIntPipe,
    )
    maxPrice?: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset?: number,
  ): Promise<{ bookings: BookingEntity[]; total: number }> {
    // Get only active bookings for search
    const result = await this.bookingService.getBookings(
      undefined, // Don't filter by user
      BookingStatus.ACTIVE,
      urgencyLevel,
      truckType,
      pickupCity || deliveryCity,
      limit,
      offset,
    );

    // Additional filtering for price range
    if (
      (minPrice && minPrice > 0) ||
      (maxPrice && maxPrice < Number.MAX_SAFE_INTEGER)
    ) {
      result.bookings = result.bookings.filter(
        (booking) =>
          booking.proposedPrice >= (minPrice || 0) &&
          booking.proposedPrice <= (maxPrice || Number.MAX_SAFE_INTEGER),
      );
      result.total = result.bookings.length;
    }

    return result;
  }

  @Get(':id/tracking')
  @ApiOperation({
    summary: 'Get booking tracking information',
    description: 'Get real-time tracking information for an accepted booking.',
  })
  @ApiParam({ name: 'id', description: 'Booking ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Tracking information retrieved successfully',
    schema: {
      example: {
        bookingId: '550e8400-e29b-41d4-a716-446655440000',
        status: 'in_progress',
        currentLocation: { latitude: 6.5244, longitude: 3.3792 },
        estimatedArrival: '2024-07-15T16:00:00Z',
        lastUpdate: '2024-07-15T13:30:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingTracking(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: any,
  ): Promise<{
    bookingId: string;
    status: string;
    currentLocation?: { latitude: number; longitude: number };
    estimatedArrival?: string;
    lastUpdate: string;
  }> {
    const booking = await this.bookingService.getBookingById(id);

    // Mock tracking data - in production, this would come from GPS tracking service
    return {
      bookingId: booking.id,
      status: booking.status,
      currentLocation: { latitude: 6.5244, longitude: 3.3792 },
      estimatedArrival: booking.requiredDeliveryTime,
      lastUpdate: new Date().toISOString(),
    };
  }
}
