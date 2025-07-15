import { Module } from '@nestjs/common';
import { BiddingController } from './bidding.controller';
import { BiddingService } from './bidding.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperService } from '../shared/helper.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [BiddingController],
  providers: [BiddingService, HelperService],
  exports: [BiddingService],
})
export class BiddingModule {}
