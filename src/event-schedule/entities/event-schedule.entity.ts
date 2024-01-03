import { Event } from 'src/event/entities/event.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EventSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(date: string) {
    this.date = date;
  }
  @ManyToOne(() => Event, (event) => event.schedules)
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  event: Event;
}
