import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../types/userRole.type';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class UserCreateSwaggerDto {
  @ApiProperty({ example: 'example@example.com', description: '이메일주소' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'test1234', description: '비밀번호' })
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ example: 'tester', description: '유저명' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'User', description: '유저타입', enum: Role })
  @IsEnum(Role)
  userType!: Role;
}
