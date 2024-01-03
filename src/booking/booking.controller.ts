import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/booking.dto';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/user/entities/user.entity';
import { Booking } from './entities/booking.entity';

@UseGuards(RolesGuard)
@Roles(Role.User)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto, @UserInfo() user) {
    return this.bookingService.create(createBookingDto, user);
  }

  @Get()
  async currentReservation(@UserInfo() user: User): Promise<Booking[]> {
    return await this.bookingService.currentBooking(user);
  }
}
