import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../types/userRole.type';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '사용자 이름을 입력해주세요' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '유저 타입을 입력해주세요' })
  userType: Role;
}
