import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../types/userRole.type';
import { ApiProperty } from '@nestjs/swagger';
import { Booking } from 'src/booking/entities/booking.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ type: 'varchar', unique: false, nullable: false })
  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @ApiProperty({ description: '이메일주소' })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  @ApiProperty({ description: '유저타입' })
  userType: Role;

  @Column({ default: 0 })
  @ApiProperty({ description: '포인트' })
  points: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // UpdatedAt column
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  constructor(
    username: string,
    email: string,
    password: string,
    userType: Role,
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.userType = userType;
    this.points = userType === Role.Admin ? 0 : 1000000;
  }
}
