import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tower_log')
export class TowerLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime' })
  log_time: Date;

  @Column({ type: 'int' })
  ph: number;

  @Column({ type: 'float' })
  temperature: number;

  @Column({ type: 'int' })
  humidity: number;

  @Column({ type: 'int' })
  light: number;

  @Column({ type: 'boolean' })
  min_water: boolean;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deleted_at: Date | null;
}
