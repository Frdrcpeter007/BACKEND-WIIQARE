import { Saving } from '../../saving/entities/saving.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum OperationType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

@Entity('operation_savings')
export class OperationSaving {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Saving, (saving) => saving.operations)
  @JoinColumn({ name: 'idSaving' })
  saving: Saving;

  @Column({
    type: 'enum',
    enum: OperationType,
  })
  type: OperationType;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column({ type: 'timestamp' })
  date: Date;
}
