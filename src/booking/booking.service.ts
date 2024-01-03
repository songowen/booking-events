import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Event } from '../event/entities/event.entity';
import { CreateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userrepository: Repository<User>,
  ) {}

  async create(
    eventId: number,
    createBookingDto: CreateBookingDto,
    user: User,
  ) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (createBookingDto.seats <= 0) {
      throw new BadRequestException('좌석 수는 0보다 커야합니다.');
    }

    if (!event) {
      throw new BadRequestException('이벤트를 찾을 수 없습니다.');
    }
    if (event.seat < createBookingDto.seats) {
      throw new BadRequestException('남은 좌석이 부족합니다.');
    }
    event.seat -= createBookingDto.seats;
    await this.eventRepository.save(event);

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user,
      event,
    });
    return this.bookingRepository.save(booking);
  }

  async currentBooking(user: User): Promise<Booking[]> {
    try {
      const findUserCurrentBooking = await this.bookingRepository.find({
        where: { user: { id: user.id } },
      });
      return findUserCurrentBooking;
    } catch (err) {
      console.log(err);
    }
  }
}
