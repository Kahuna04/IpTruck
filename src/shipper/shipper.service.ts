import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '../shared/helper.service';
import { CreateShipperDto } from './dto/create-shipper.dto';
import { UpdateShipperDto } from './dto/update-shipper.dto';
import { Shipper, User } from '@prisma/client';

@Injectable()
export class ShipperService {
  private readonly logger = new Logger(ShipperService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Create a new shipper
   */
  async create(createShipperDto: CreateShipperDto): Promise<Shipper> {
    try {
      const shipper = await this.prisma.shipper.create({
        data: {
          ...createShipperDto,
        },
      });

      this.logger.log(`Shipper created successfully: ${shipper.id}`);
      return shipper;
    } catch (error) {
      this.logger.error(`Error creating shipper: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get all shippers with pagination
   */
  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    try {
      const [shippers, total] = await Promise.all([
        this.prisma.shipper.findMany({
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                isActive: true,
                isVerified: true,
                createdAt: true,
              },
            },
            _count: {
              select: {
                bookings: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.shipper.count(),
      ]);

      const pagination = this.helperService.getPaginationMeta(page, limit, total);

      return {
        data: shippers,
        pagination,
      };
    } catch (error) {
      this.logger.error(`Error fetching shippers: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get shipper by ID
   */
  async findOne(id: string): Promise<Shipper> {
    try {
      const shipper = await this.prisma.shipper.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              isActive: true,
              isVerified: true,
              createdAt: true,
            },
          },
          bookings: {
            select: {
              id: true,
              description: true,
              status: true,
              proposedPrice: true,
              currency: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 5, // Latest 5 bookings
          },
        },
      });

      if (!shipper) {
        throw new NotFoundException(`Shipper with ID ${id} not found`);
      }

      return shipper;
    } catch (error) {
      this.logger.error(`Error fetching shipper: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get shipper by user ID
   */
  async findByUserId(userId: string): Promise<Shipper | null> {
    try {
      return await this.prisma.shipper.findUnique({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              isActive: true,
              isVerified: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching shipper by user ID: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Update shipper profile
   */
  async update(id: string, updateShipperDto: UpdateShipperDto): Promise<Shipper> {
    try {
      const shipper = await this.prisma.shipper.update({
        where: { id },
        data: updateShipperDto,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              isActive: true,
              isVerified: true,
              createdAt: true,
            },
          },
        },
      });

      this.logger.log(`Shipper updated successfully: ${shipper.id}`);
      return shipper;
    } catch (error) {
      this.logger.error(`Error updating shipper: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Delete shipper
   */
  async remove(id: string): Promise<void> {
    try {
      await this.prisma.shipper.delete({
        where: { id },
      });

      this.logger.log(`Shipper deleted successfully: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting shipper: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get shipper statistics
   */
  async getStatistics(shipperId: string) {
    try {
      const stats = await this.prisma.shipper.findUnique({
        where: { id: shipperId },
        select: {
          _count: {
            select: {
              bookings: true,
            },
          },
          bookings: {
            select: {
              status: true,
              proposedPrice: true,
              currency: true,
            },
          },
        },
      });

      if (!stats) {
        throw new NotFoundException(`Shipper with ID ${shipperId} not found`);
      }

      const bookingsByStatus = stats.bookings.reduce((acc, booking) => {
        acc[booking.status] = (acc[booking.status] || 0) + 1;
        return acc;
      }, {});

      const totalSpent = stats.bookings
        .filter(booking => booking.status === 'COMPLETED')
        .reduce((total, booking) => total + booking.proposedPrice, 0);

      return {
        totalBookings: stats._count.bookings,
        bookingsByStatus,
        totalSpent,
        currency: stats.bookings[0]?.currency || 'NGN',
      };
    } catch (error) {
      this.logger.error(`Error fetching shipper statistics: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Search shippers
   */
  async search(query: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    try {
      const [shippers, total] = await Promise.all([
        this.prisma.shipper.findMany({
          where: {
            OR: [
              { companyName: { contains: query, mode: 'insensitive' } },
              { businessEmail: { contains: query, mode: 'insensitive' } },
              { city: { contains: query, mode: 'insensitive' } },
              { state: { contains: query, mode: 'insensitive' } },
            ],
          },
          skip,
          take: limit,
          include: {
            user: {
              select: {
                id: true,
                email: true,
                isActive: true,
                isVerified: true,
                createdAt: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.shipper.count({
          where: {
            OR: [
              { companyName: { contains: query, mode: 'insensitive' } },
              { businessEmail: { contains: query, mode: 'insensitive' } },
              { city: { contains: query, mode: 'insensitive' } },
              { state: { contains: query, mode: 'insensitive' } },
            ],
          },
        }),
      ]);

      const pagination = this.helperService.getPaginationMeta(page, limit, total);

      return {
        data: shippers,
        pagination,
      };
    } catch (error) {
      this.logger.error(`Error searching shippers: ${error.message}`, error.stack);
      throw error;
    }
  }
}
