import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateEventScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;


}
