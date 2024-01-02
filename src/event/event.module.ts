import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventSchedule } from 'src/event-schedule/entities/event-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventSchedule])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
