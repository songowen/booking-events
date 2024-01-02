import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from './entities/user.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UserCreateSwaggerDto } from './dto/userCreateSwagger.dto';
import { UserLoginSwaggerDto } from './dto/userLoginSwagger.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('user API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '유저생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  @ApiBody({ type: UserCreateSwaggerDto })
  async register(@Body() registerDto: RegisterDto) {
    console.log({ registerDto });
    return await this.userService.register(
      registerDto.email,
      registerDto.password,
      registerDto.username,
      registerDto.userType,
    );
  }

  @Post('login')
  @ApiOperation({
    summary: '유저로그인 API',
    description: '유저를 로그인한다.',
  })
  @ApiCreatedResponse({ description: '유저를 로그인한다.', type: User })
  @ApiBody({ type: UserLoginSwaggerDto })
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getId(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    return await this.userService.getUserById(userId);
  }
}
