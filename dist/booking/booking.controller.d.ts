import { BookingService, BookingStatus, BookingEntity, BidEntity } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBidDto, BidResponseDto } from '../bidding/dto/create-bid.dto';
import { UpdateBidDto } from '../bidding/dto/update-bid.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createBooking(createBookingDto: CreateBookingDto, user: any): Promise<any>;
    getBookings(status?: BookingStatus, urgencyLevel?: string, truckType?: string, location?: string, myBookings?: boolean, limit?: number, offset?: number, user?: any): Promise<{
        bookings: BookingEntity[];
        total: number;
    }>;
    getBookingById(id: string): Promise<BookingEntity>;
    updateBookingStatus(id: string, body: {
        status: BookingStatus;
    }, user: any): Promise<BookingEntity>;
    cancelBooking(id: string, body: {
        reason?: string;
    }, user: any): Promise<void>;
    getBidsForBooking(id: string, user: any): Promise<BidEntity[]>;
    createBid(bookingId: string, createBidDto: CreateBidDto, user: any): Promise<BidEntity>;
    getUserBids(user: any): Promise<BidEntity[]>;
    updateBid(bidId: string, updateBidDto: UpdateBidDto, user: any): Promise<BidEntity>;
    respondToBid(bidId: string, bidResponseDto: BidResponseDto, user: any): Promise<BidEntity>;
    getBookingStats(user: any): Promise<{
        totalBookings: number;
        activeBookings: number;
        completedBookings: number;
        totalBids: number;
        acceptedBids: number;
        pendingBids: number;
    }>;
    searchBookings(pickupCity?: string, deliveryCity?: string, truckType?: string, urgencyLevel?: string, minPrice?: number, maxPrice?: number, limit?: number, offset?: number): Promise<{
        bookings: BookingEntity[];
        total: number;
    }>;
    getBookingTracking(id: string, user: any): Promise<{
        bookingId: string;
        status: string;
        currentLocation?: {
            latitude: number;
            longitude: number;
        };
        estimatedArrival?: string;
        lastUpdate: string;
    }>;
}
