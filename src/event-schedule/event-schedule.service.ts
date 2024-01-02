import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventSchedule } from './entities/event-schedule.entity';
import { Repository } from 'typeorm';
import { CreateEventScheduleDto } from './dto/createEventSchedule.dto';

@Injectable()
export class EventScheduleService {
  constructor(
    @InjectRepository(EventSchedule)
    private readonly eventScheduleRepository: Repository<EventSchedule>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(
    eventId: string,
    createEventScheduleDto: CreateEventScheduleDto,
  ) {
    const event = await this.eventRepository.findOne({
      where: { id: 1 },
    });
    if (!event) {
      throw new Error('Event not found');
    }
    const newEventSchedule = new EventSchedule(createEventScheduleDto.date);
    newEventSchedule.event = event;
    return this.eventScheduleRepository.save(newEventSchedule);
  }
}
