import { Module } from '@nestjs/common';
import { EventScheduleController } from './event-schedule.controller';
import { EventScheduleService } from './event-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSchedule } from './entities/event-schedule.entity';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventSchedule])],
  controllers: [EventScheduleController],
  providers: [EventScheduleService], //controller 가 사용하는 내부서비스
})
export class EventScheduleModule {}
