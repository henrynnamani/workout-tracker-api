import { Workout } from '@/module/workouts/model/workout.entity';
import { BaseModel } from 'src/shared/base-model';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @OneToMany(() => Workout, (workout) => workout.user)
  workouts: Workout[];
}
