export interface IWorkoutExercise {
  id: string;
  sets: number;
  reps: number;
  weight: number;
}

export interface IWorkoutPlan {
  title: string;
  scheduledAt?: Date;
  userId: string;
  exercises: Array<WorkoutExercise>;
}
