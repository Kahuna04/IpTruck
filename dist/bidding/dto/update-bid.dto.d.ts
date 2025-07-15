import { CreateBidDto } from './create-bid.dto';
import { BidStatus } from '@prisma/client';
declare const UpdateBidDto_base: import("@nestjs/common").Type<Partial<CreateBidDto>>;
export declare class UpdateBidDto extends UpdateBidDto_base {
    status?: BidStatus;
    message?: string;
    bidAmount?: number;
    proposedPickupTime?: string;
    estimatedDeliveryTime?: string;
    responseMessage?: string;
    bidExpiresAt?: string;
    paymentTerms?: string;
    specialTerms?: string;
}
export {};
