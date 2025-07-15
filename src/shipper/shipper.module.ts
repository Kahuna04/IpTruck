import { Module } from '@nestjs/common';
import { ShipperController } from './shipper.controller';
import { ShipperService } from './shipper.service';
import { PrismaModule } from '../prisma/prisma.module';
import { HelperService } from '../shared/helper.service';

@Module({
  imports: [PrismaModule],
  controllers: [ShipperController],
  providers: [ShipperService, HelperService],
  exports: [ShipperService],
})
export class ShipperModule {}
