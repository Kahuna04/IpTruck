import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HelperService } from '../shared/helper.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Carrier, Truck } from '@prisma/client';

@Injectable()
export class CarrierService {
  private readonly logger = new Logger(CarrierService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly helperService: HelperService,
  ) {}

  /**
   * Create a new carrier
   */
  async create(createCarrierDto: CreateCarrierDto): Promise<Carrier> {
    try {
      const carrier = await this.prisma.carrier.create({
        data: {
          ...createCarrierDto,
        },
      });

      this.logger.log(`Carrier created successfully: ${carrier.id}`);
      return carrier;
    } catch (error) {
      this.logger.error(`Error creating carrier: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get all carriers with pagination
   */
  async findAll(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    try {
      const [carriers, total] = await Promise.all([
        this.prisma.carrier.findMany({
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
                trucks: true,
                bids: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        }),
        this.prisma.carrier.count(),
      ]);

      const pagination = this.helperService.getPaginationMeta(page, limit, total);

      return {
        data: carriers,
        pagination,
      };
    } catch (error) {
      this.logger.error(`Error fetching carriers: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get carrier by ID
   */
  async findOne(id: string): Promise<Carrier> {
    try {
      const carrier = await this.prisma.carrier.findUnique({
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
          trucks: {
            select: {
              id: true,
              makeModel: true,
              year: true,
              licensePlate: true,
              truckType: true,
              maxPayload: true,
              isActive: true,
              createdAt: true,
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
          bids: {
            select: {
              id: true,
              bidAmount: true,
              status: true,
              createdAt: true,
              booking: {
                select: {
                  id: true,
                  description: true,
                  status: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
            take: 5, // Latest 5 bids
          },
        },
      });

      if (!carrier) {
        throw new NotFoundException(`Carrier with ID ${id} not found`);
      }

      return carrier;
    } catch (error) {
      this.logger.error(`Error fetching carrier: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get carrier by user ID
   */
  async findByUserId(userId: string): Promise<Carrier | null> {
    try {
      return await this.prisma.carrier.findUnique({
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
          trucks: {
            select: {
              id: true,
              makeModel: true,
              year: true,
              licensePlate: true,
              truckType: true,
              maxPayload: true,
              isActive: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching carrier by user ID: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Update carrier profile
   */
  async update(id: string, updateCarrierDto: UpdateCarrierDto): Promise<Carrier> {
    try {
      const carrier = await this.prisma.carrier.update({
        where: { id },
        data: updateCarrierDto,
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

      this.logger.log(`Carrier updated successfully: ${carrier.id}`);
      return carrier;
    } catch (error) {
      this.logger.error(`Error updating carrier: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Delete carrier
   */
  async remove(id: string): Promise<void> {
    try {
      await this.prisma.carrier.delete({
        where: { id },
      });

      this.logger.log(`Carrier deleted successfully: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting carrier: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get carrier statistics
   */
  async getStatistics(carrierId: string) {
    try {
      const stats = await this.prisma.carrier.findUnique({
        where: { id: carrierId },
        select: {
          rating: true,
          completedJobs: true,
          _count: {
            select: {
              trucks: true,
              bids: true,
            },
          },
          bids: {
            select: {
              status: true,
              bidAmount: true,
              currency: true,
            },
          },
        },
      });

      if (!stats) {
        throw new NotFoundException(`Carrier with ID ${carrierId} not found`);
      }

      const bidsByStatus = stats.bids.reduce((acc, bid) => {
        acc[bid.status] = (acc[bid.status] || 0) + 1;
        return acc;
      }, {});

      const totalEarnings = stats.bids
        .filter(bid => bid.status === 'ACCEPTED')
        .reduce((total, bid) => total + bid.bidAmount, 0);

      return {
        rating: stats.rating,
        completedJobs: stats.completedJobs,
        totalTrucks: stats._count.trucks,
        totalBids: stats._count.bids,
        bidsByStatus,
        totalEarnings,
        currency: stats.bids[0]?.currency || 'NGN',
      };
    } catch (error) {
      this.logger.error(`Error fetching carrier statistics: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Search carriers
   */
  async search(query: string, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    try {
      const [carriers, total] = await Promise.all([
        this.prisma.carrier.findMany({
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
            _count: {
              select: {
                trucks: true,
                bids: true,
              },
            },
          },
          orderBy: {
            rating: 'desc',
          },
        }),
        this.prisma.carrier.count({
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
        data: carriers,
        pagination,
      };
    } catch (error) {
      this.logger.error(`Error searching carriers: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Add a truck to carrier's fleet
   */
  async addTruck(carrierId: string, createTruckDto: CreateTruckDto): Promise<Truck> {
    try {
      const truck = await this.prisma.truck.create({
        data: {
          carrierId,
          ...createTruckDto,
        },
      });

      this.logger.log(`Truck added to carrier ${carrierId}: ${truck.id}`);
      return truck;
    } catch (error) {
      this.logger.error(`Error adding truck: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get all trucks for a carrier
   */
  async getTrucks(carrierId: string): Promise<Truck[]> {
    try {
      return await this.prisma.truck.findMany({
        where: { carrierId },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      this.logger.error(`Error fetching trucks: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Get truck by ID
   */
  async getTruckById(truckId: string): Promise<Truck> {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id: truckId },
        include: {
          carrier: {
            select: {
              id: true,
              companyName: true,
              businessEmail: true,
              contactPhone: true,
            },
          },
        },
      });

      if (!truck) {
        throw new NotFoundException(`Truck with ID ${truckId} not found`);
      }

      return truck;
    } catch (error) {
      this.logger.error(`Error fetching truck: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Update truck
   */
  async updateTruck(truckId: string, updateTruckDto: UpdateTruckDto): Promise<Truck> {
    try {
      const truck = await this.prisma.truck.update({
        where: { id: truckId },
        data: updateTruckDto,
      });

      this.logger.log(`Truck updated successfully: ${truck.id}`);
      return truck;
    } catch (error) {
      this.logger.error(`Error updating truck: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Delete truck
   */
  async removeTruck(truckId: string): Promise<void> {
    try {
      await this.prisma.truck.delete({
        where: { id: truckId },
      });

      this.logger.log(`Truck deleted successfully: ${truckId}`);
    } catch (error) {
      this.logger.error(`Error deleting truck: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Update carrier rating
   */
  async updateRating(carrierId: string, newRating: number): Promise<Carrier> {
    try {
      const carrier = await this.prisma.carrier.update({
        where: { id: carrierId },
        data: {
          rating: newRating,
        },
      });

      this.logger.log(`Carrier rating updated: ${carrierId} - ${newRating}`);
      return carrier;
    } catch (error) {
      this.logger.error(`Error updating carrier rating: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Increment completed jobs count
   */
  async incrementCompletedJobs(carrierId: string): Promise<Carrier> {
    try {
      const carrier = await this.prisma.carrier.update({
        where: { id: carrierId },
        data: {
          completedJobs: {
            increment: 1,
          },
        },
      });

      this.logger.log(`Completed jobs incremented for carrier: ${carrierId}`);
      return carrier;
    } catch (error) {
      this.logger.error(`Error incrementing completed jobs: ${error.message}`, error.stack);
      throw error;
    }
  }
}
