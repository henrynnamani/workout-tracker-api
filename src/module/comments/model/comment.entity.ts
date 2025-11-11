import { User } from '@/module/user/model/user.entity';
import { WorkoutPlan } from '@/module/workout-plan/model/workout-plan.entity';
import { BaseModel } from '@/shared/base-model';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('comments')
export class Comment extends BaseModel {
  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => WorkoutPlan, (plan) => plan.exercises, {
    onDelete: 'CASCADE',
  })
  workoutPlans: WorkoutPlan[];
}
