import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { BiddingService } from './bidding.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { BidStatus } from '@prisma/client';

// Mock authentication guard - replace with actual implementation
class JwtAuthGuard {}

// Mock current user decorator - replace with actual implementation
const CurrentUser = () => (target: any, propertyKey: string, parameterIndex: number) => {};

interface User {
  id: string;
  email: string;
  role: string;
}

@ApiTags('Bidding')
@Controller('bidding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BiddingController {
  constructor(private readonly biddingService: BiddingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bid' })
  @ApiResponse({
    status: 201,
    description: 'Bid created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bookingId: { type: 'string', format: 'uuid' },
        bidderId: { type: 'string', format: 'uuid' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        status: { type: 'string', enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED'] },
        message: { type: 'string' },
        validUntil: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async create(@Body() createBidDto: CreateBidDto, @CurrentUser() user: User) {
    // Validate user can create bid for this booking
    if (createBidDto.carrierId !== user.id) {
      throw new ForbiddenException('You can only create bids for yourself');
    }

    try {
      const bid = await this.biddingService.create(createBidDto);
      return {
        message: 'Bid created successfully',
        data: bid,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Duplicate bid detected');
      }
      if (error.code === 'P2003') {
        throw new NotFoundException('Booking not found');
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all bids with optional filtering' })
  @ApiQuery({ name: 'bookingId', required: false, description: 'Filter by booking ID' })
  @ApiQuery({ name: 'bidderId', required: false, description: 'Filter by bidder ID' })
  @ApiQuery({ name: 'status', required: false, enum: BidStatus, description: 'Filter by bid status' })
  @ApiQuery({ name: 'minAmount', required: false, type: Number, description: 'Minimum bid amount' })
  @ApiQuery({ name: 'maxAmount', required: false, type: Number, description: 'Maximum bid amount' })
  @ApiQuery({ name: 'currency', required: false, description: 'Filter by currency' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort field (default: createdAt)' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], description: 'Sort order (default: desc)' })
  @ApiResponse({
    status: 200,
    description: 'List of bids retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              bookingId: { type: 'string', format: 'uuid' },
              bidderId: { type: 'string', format: 'uuid' },
              amount: { type: 'number' },
              currency: { type: 'string' },
              status: { type: 'string' },
              message: { type: 'string' },
              validUntil: { type: 'string', format: 'date-time' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            pages: { type: 'number' },
          },
        },
      },
    },
  })
  async findAll(
    @Query('bookingId') bookingId?: string,
    @Query('bidderId') bidderId?: string,
    @Query('status') status?: BidStatus,
    @Query('minAmount') minAmount?: number,
    @Query('maxAmount') maxAmount?: number,
    @Query('currency') currency?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'desc',
    @CurrentUser() user: User,
  ) {
    const filters = {
      bookingId,
      bidderId,
      status,
      minAmount: minAmount ? Number(minAmount) : undefined,
      maxAmount: maxAmount ? Number(maxAmount) : undefined,
      currency,
    };

    const options = {
      page: Number(page),
      limit: Math.min(Number(limit), 100), // Cap at 100 items per page
      sortBy,
      sortOrder,
    };

    const result = await this.biddingService.findAll(filters, options);

    return {
      message: 'Bids retrieved successfully',
      data: result.bids,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: result.total,
        pages: Math.ceil(result.total / options.limit),
      },
    };
  }

  @Get('my-bids')
  @ApiOperation({ summary: 'Get current user\'s bids' })
  @ApiQuery({ name: 'status', required: false, enum: BidStatus, description: 'Filter by bid status' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'User bids retrieved successfully',
  })
  async findMyBids(
    @Query('status') status?: BidStatus,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @CurrentUser() user: User,
  ) {
    const filters = {
      bidderId: user.id,
      status,
    };

    const options = {
      page: Number(page),
      limit: Math.min(Number(limit), 100),
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
    };

    const result = await this.biddingService.findAll(filters, options);

    return {
      message: 'Your bids retrieved successfully',
      data: result.bids,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: result.total,
        pages: Math.ceil(result.total / options.limit),
      },
    };
  }

  @Get('booking/:bookingId')
  @ApiOperation({ summary: 'Get all bids for a specific booking' })
  @ApiParam({ name: 'bookingId', description: 'Booking ID', type: 'string' })
  @ApiQuery({ name: 'status', required: false, enum: BidStatus, description: 'Filter by bid status' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Booking bids retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async findBidsForBooking(
    @Param('bookingId', ParseUUIDPipe) bookingId: string,
    @Query('status') status?: BidStatus,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @CurrentUser() user: User,
  ) {
    const filters = {
      bookingId,
      status,
    };

    const options = {
      page: Number(page),
      limit: Math.min(Number(limit), 100),
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
    };

    const result = await this.biddingService.findAll(filters, options);

    return {
      message: 'Booking bids retrieved successfully',
      data: result.bids,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: result.total,
        pages: Math.ceil(result.total / options.limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific bid by ID' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        bookingId: { type: 'string', format: 'uuid' },
        bidderId: { type: 'string', format: 'uuid' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        status: { type: 'string' },
        message: { type: 'string' },
        validUntil: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    const bid = await this.biddingService.findOne(id);

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    return {
      message: 'Bid retrieved successfully',
      data: bid,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a bid (only by bidder)' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBidDto: UpdateBidDto,
    @CurrentUser() user: User,
  ) {
    const existingBid = await this.biddingService.findOne(id);

    if (!existingBid) {
      throw new NotFoundException('Bid not found');
    }

    // Only the bidder can update their own bid
    if (existingBid.carrierId !== user.id) {
      throw new ForbiddenException('You can only update your own bids');
    }

    // Prevent updating accepted or rejected bids
    if (existingBid.status === BidStatus.ACCEPTED || existingBid.status === BidStatus.REJECTED) {
      throw new BadRequestException('Cannot update accepted or rejected bids');
    }

    const updatedBid = await this.biddingService.update(id, updateBidDto);

    return {
      message: 'Bid updated successfully',
      data: updatedBid,
    };
  }

  @Patch(':id/accept')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Accept a bid (only by booking owner)' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid accepted successfully',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @ApiResponse({ status: 400, description: 'Cannot accept this bid' })
  async acceptBid(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    const bid = await this.biddingService.findOne(id);

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    // TODO: Verify that the user is the booking owner
    // This would require fetching the booking and checking ownership
    // For now, we'll use a placeholder validation

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException('Only pending bids can be accepted');
    }

    // Check if bid is still valid
    if (bid.validUntil && new Date() > new Date(bid.validUntil)) {
      throw new BadRequestException('Bid has expired');
    }

    const acceptedBid = await this.biddingService.update(id, { status: BidStatus.ACCEPTED });

    return {
      message: 'Bid accepted successfully',
      data: acceptedBid,
    };
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a bid (only by booking owner)' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid rejected successfully',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @ApiResponse({ status: 400, description: 'Cannot reject this bid' })
  async rejectBid(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    const bid = await this.biddingService.findOne(id);

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    // TODO: Verify that the user is the booking owner
    // This would require fetching the booking and checking ownership

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException('Only pending bids can be rejected');
    }

    const rejectedBid = await this.biddingService.update(id, { status: BidStatus.REJECTED });

    return {
      message: 'Bid rejected successfully',
      data: rejectedBid,
    };
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a bid (only by bidder)' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Bid cancelled successfully',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @ApiResponse({ status: 400, description: 'Cannot cancel this bid' })
  async cancelBid(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    const bid = await this.biddingService.findOne(id);

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    // Only the bidder can cancel their own bid
    if (bid.carrierId !== user.id) {
      throw new ForbiddenException('You can only cancel your own bids');
    }

    if (bid.status !== BidStatus.PENDING) {
      throw new BadRequestException('Only pending bids can be cancelled');
    }

    const cancelledBid = await this.biddingService.update(id, { status: BidStatus.CANCELLED });

    return {
      message: 'Bid cancelled successfully',
      data: cancelledBid,
    };
  }

  @Get('stats/summary')
  @ApiOperation({ summary: 'Get bidding statistics' })
  @ApiResponse({
    status: 200,
    description: 'Bidding statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        totalBids: { type: 'number' },
        pendingBids: { type: 'number' },
        acceptedBids: { type: 'number' },
        rejectedBids: { type: 'number' },
        cancelledBids: { type: 'number' },
        averageBidAmount: { type: 'number' },
        userBidCount: { type: 'number' },
      },
    },
  })
  async getStats(@CurrentUser() user: User) {
    const stats = await this.biddingService.getStatistics(user.id);

    return {
      message: 'Bidding statistics retrieved successfully',
      data: stats,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a bid (only by bidder for pending bids)' })
  @ApiParam({ name: 'id', description: 'Bid ID', type: 'string' })
  @ApiResponse({
    status: 204,
    description: 'Bid deleted successfully',
  })
  @ApiResponse({ status: 403, description: 'Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Bid not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete this bid' })
  async remove(@Param('id', ParseUUIDPipe) id: string, @CurrentUser() user: User) {
    const bid = await this.biddingService.findOne(id);

    if (!bid) {
      throw new NotFoundException('Bid not found');
    }

    // Only the bidder can delete their own bid
    if (bid.carrierId !== user.id) {
      throw new ForbiddenException('You can only delete your own bids');
    }

    // Only allow deleting pending or cancelled bids
    if (bid.status !== BidStatus.PENDING && bid.status !== BidStatus.CANCELLED) {
      throw new BadRequestException('Only pending or cancelled bids can be deleted');
    }

    await this.biddingService.remove(id);

    return {
      message: 'Bid deleted successfully',
    };
  }
}
