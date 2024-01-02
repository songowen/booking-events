import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginSwaggerDto {
  @IsEmail()
  @ApiProperty({ example: 'example@example.com', description: '이메일주소' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'test1234', description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  password: string;
}
