import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateEventDto } from './dto/createEvent.dto';
import { Event } from './entities/event.entity';
import { EventSchedule } from 'src/event-schedule/entities/event-schedule.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventSchedule)
    private readonly eventScheduleRepository: Repository<EventSchedule>,
  ) {}

  async createEvent(createEventDto: CreateEventDto) {
    return await this.eventRepository.save(
      new Event(
        createEventDto.title,
        createEventDto.description,
        createEventDto.price,
        createEventDto.location,
        createEventDto.seat,
        createEventDto.image,
        createEventDto.category,
      ),
    );
  }

  async findAll() {
    return await this.eventRepository.find({
      select: ['title'],
    });
  }

  async searchEvents(title: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
    });
  }

  async findOne(id: number) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['eventschedules'],
    });
    if (!event) {
      throw new NotFoundException('해당 공연을 찾을 수 없습니다.');
    }
    return event;
  }
}
