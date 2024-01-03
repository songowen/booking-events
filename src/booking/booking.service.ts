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

  async create(createBookingDto: CreateBookingDto, user: User) {
    const event = await this.eventRepository.findOne({
      where: { id: createBookingDto.eventId },
    });

    if (!event) {
      throw new BadRequestException('Event not found');
    }
    if (event.seat < createBookingDto.seats) {
      throw new BadRequestException('Not enough seats available');
    }
    event.seat -= createBookingDto.seats;
    await this.eventRepository.save(event);

    const booking = this.bookingRepository.create({
      ...createBookingDto,
      user,
    });
    return this.bookingRepository.save(booking);
  }

  async currentReservation(user: User): Promise<Booking[]> {
    try {
      console.log({ user: user });  // 전달되는 객체 출력
      const findUserCurrentReservation = await this.bookingRepository.find({
        where: { user: { id: user.id } },
      });
      console.log('findUserCurrentReservation', findUserCurrentReservation);
      return findUserCurrentReservation;
    } catch (err) {
      console.log(err);
    }
  }
}
