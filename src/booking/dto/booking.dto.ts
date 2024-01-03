import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @IsNumber()
  @IsNotEmpty()
  seats: number;
}
