import { Module } from '@nestjs/common';
import { EventScheduleController } from './event-schedule.controller';
import { EventScheduleService } from './event-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSchedule } from './entities/event-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventSchedule])],
  controllers: [EventScheduleController],
  providers: [EventScheduleService],
})
export class EventScheduleModule {}
