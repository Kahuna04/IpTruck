import { Module } from '@nestjs/common';
import { CarrierController } from './carrier.controller';
import { CarrierService } from './carrier.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperService } from '../shared/helper.service';

@Module({
  imports: [PrismaModule],
  controllers: [CarrierController],
  providers: [CarrierService, HelperService],
  exports: [CarrierService],
})
export class CarrierModule {}
