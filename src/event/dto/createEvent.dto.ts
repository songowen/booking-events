import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: '공연제목을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '공연설명를 입력해주세요' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '공연장소를 입력해주세요' })
  location: string;

  @IsNotEmpty({ message: '전체좌석수를 입력해주세요' })
  @IsInt()
  seat: number;

  @IsString()
  @IsNotEmpty({ message: '이미지를 입력해주세요' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요' })
  category: string;

  @IsNumber()
  @IsNotEmpty({ message: '가격을 입력해주세요' })
  price: number;
}
