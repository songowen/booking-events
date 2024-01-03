import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEventScheduleDto } from './dto/createEventSchedule.dto';
import { EventScheduleService } from './event-schedule.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { AuthGuard } from '@nestjs/passport';

@Controller('event-schedule')
export class EventScheduleController {
  constructor(private readonly eventScheduleService: EventScheduleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(Role.Admin)
  @Post('/:id')
  async create(
    @Param('id') eventId: number,
    @Body() createEventScheduleDto: CreateEventScheduleDto,
  ) {
    return this.eventScheduleService.create(eventId, createEventScheduleDto);
  }
}
