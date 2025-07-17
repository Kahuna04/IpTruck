import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { EmailModule } from '../email/email.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [EmailModule, SharedModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
