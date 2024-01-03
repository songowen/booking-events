import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSchedule } from './entities/event-schedule.entity';
import { Repository } from 'typeorm';
import { CreateEventScheduleDto } from './dto/createEventSchedule.dto';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectRepository(EventSchedule)
    private readonly eventScheduleRepository: Repository<EventSchedule>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(
    eventId: number,
    createEventScheduleDto: CreateEventScheduleDto,
  ) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    const newEventSchedule = new EventSchedule(createEventScheduleDto.date);
    newEventSchedule.event = event;
    return this.eventScheduleRepository.save(newEventSchedule);
  }
}
