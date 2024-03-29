import { Booking } from 'src/booking/entities/booking.entity';
import { EventSchedule } from 'src/event-schedule/entities/event-schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'events',
})
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    title: string,
    description: string,
    price: number,
    location: string,
    seat: number,
    image: string,
    category: string,
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.location = location;
    this.seat = seat;
    this.image = image;
    this.category = category;
  }

  @OneToMany(() => EventSchedule, (schedule) => schedule.event, { eager: true })
  schedules: EventSchedule[];

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
