import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  seats: number;
}
