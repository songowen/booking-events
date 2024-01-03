import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/createEvent.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/search')
  async searchEvents(@Query('title') title: string) {
    return this.eventService.searchEvents(title);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(parseInt(id, 10));
  }
}
