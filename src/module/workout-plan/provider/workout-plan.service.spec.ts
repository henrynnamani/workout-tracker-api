import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutExercisesService } from '@/module/workout-exercises/provider/workout-exercises.service';
import { CommentsService } from '@/module/comments/provider/comments.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WorkoutPlan, WorkoutPlanStatus } from '../model/workout-plan.entity';
import { RequestTimeoutException, NotFoundException } from '@nestjs/common';
import * as SYS_MSG from '@/shared/system-message';

jest.mock('@/shared/services/model-action.service', () => {
  return {
    ModelAction: jest.fn().mockImplementation(() => ({
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    })),
  };
});

import { ModelAction } from '@/shared/services/model-action.service';

describe('WorkoutPlanService', () => {
  let service: WorkoutPlanService;
  let workoutExerciseService: WorkoutExercisesService;
  let commentsService: CommentsService;
  let modelAction: jest.Mocked<ModelAction<WorkoutPlan>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkoutPlanService,
        WorkoutExercisesService,
        CommentsService,
        {
          provide: getRepositoryToken(WorkoutPlan),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<WorkoutPlanService>(WorkoutPlanService);
    workoutExerciseService = module.get<WorkoutExercisesService>(
      WorkoutExercisesService,
    );
    commentsService = module.get<CommentsService>(CommentsService);
    modelAction = (service as any).modelAction;
  });

  afterEach(() => jest.clearAllMocks());

  describe('createWorkout', () => {
    it('should create and save a workout successfully', async () => {
      const mockWorkout = { id: '1', title: 'Plan' } as any;
      const exercises = [{ name: 'Push Up' }];
      modelAction.create.mockResolvedValue(mockWorkout);
      workoutExerciseService.addWorkoutExercises = jest
        .fn()
        .mockResolvedValue(exercises);
      modelAction.save.mockResolvedValue({ ...mockWorkout, exercises });

      const result = await service.createWorkout({
        title: 'Plan',
        exercises,
        userId: '1',
      });

      expect(result.message).toBe(SYS_MSG.WORKOUT_CREATED_SUCCESSFULLY);
      expect(result.data.exercises).toEqual(exercises);
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.create.mockRejectedValue(new Error('fail'));
      await expect(
        service.createWorkout({ title: 'Plan', exercises: [], userId: '1' }),
      ).rejects.toBeInstanceOf(RequestTimeoutException);
    });
  });

  describe('updateWorkout', () => {
    it('should update a workout with a comment', async () => {
      const mockWorkout = { id: '1', comments: [] } as any;
      const mockComment = { id: 'c1', content: 'Great' };
      modelAction.findOne.mockResolvedValue(mockWorkout);
      commentsService.addComment = jest.fn().mockResolvedValue(mockComment);
      modelAction.save.mockResolvedValue({
        ...mockWorkout,
        comments: [mockComment],
      });

      const result = await service.updateWorkout('Great', '1', 'u1');

      expect(result.message).toBe(SYS_MSG.WORKOUT_UPDATED_SUCCESSFULLY);
      expect(result.data.comments).toContain(mockComment);
    });

    it('should throw NotFoundException if workout not found', async () => {
      modelAction.findOne.mockResolvedValue(null as unknown as WorkoutPlan);
      await expect(
        service.updateWorkout('x', '1', 'u1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.findOne.mockRejectedValue(new Error('fail'));
      await expect(
        service.updateWorkout('x', '1', 'u1'),
      ).rejects.toBeInstanceOf(RequestTimeoutException);
    });
  });

  describe('deleteWorkout', () => {
    it('should delete a workout successfully', async () => {
      modelAction.findOne.mockResolvedValue({ id: '1' } as any);
      modelAction.remove.mockResolvedValue(undefined as unknown as WorkoutPlan);

      const result = await service.deleteWorkout('1');
      expect(result.message).toBe(SYS_MSG.WORKOUT_DELETED_SUCCESSFULLY);
      expect(modelAction.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if workout not found', async () => {
      modelAction.findOne.mockResolvedValue(null as unknown as WorkoutPlan);
      await expect(service.deleteWorkout('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.findOne.mockRejectedValue(new Error('fail'));
      await expect(service.deleteWorkout('1')).rejects.toBeInstanceOf(
        RequestTimeoutException,
      );
    });
  });

  describe('scheduleWorkoutout', () => {
    it('should schedule a workout', async () => {
      const mockWorkout = { id: '1', scheduledAt: new Date() } as any;
      modelAction.update.mockResolvedValue(mockWorkout);

      const result = await service.scheduleWorkoutout('1', new Date());
      expect(result.message).toBe(SYS_MSG.WORKOUT_SCHEDULED_SUCCESSFULLY);
      expect(result.data).toEqual(mockWorkout);
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.update.mockRejectedValue(new Error('fail'));
      await expect(
        service.scheduleWorkoutout('1', new Date()),
      ).rejects.toBeInstanceOf(RequestTimeoutException);
    });
  });

  describe('getWorkouts', () => {
    it('should fetch workouts by status', async () => {
      const workouts = [
        {
          id: '1',
          status: WorkoutPlanStatus.PENDING,
          title: 'Learning',
          scheduledAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          user: {} as any,
          exercises: [],
          comments: [],
        },
      ];
      modelAction.findAll.mockResolvedValue(workouts);

      const result = await service.getWorkouts(WorkoutPlanStatus.PENDING);
      expect(result.message).toBe(SYS_MSG.WORKOUTS_FETCHED_SUCCESSFULLY);
      expect(result.data).toEqual(workouts);
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.findAll.mockRejectedValue(new Error('fail'));
      await expect(
        service.getWorkouts(WorkoutPlanStatus.PENDING),
      ).rejects.toBeInstanceOf(RequestTimeoutException);
    });
  });

  describe('generateWorkoutReport', () => {
    it('should generate a workout report', async () => {
      const workouts = [
        { status: WorkoutPlanStatus.PENDING },
        { status: WorkoutPlanStatus.COMPLETED },
      ];
      modelAction.findAll.mockResolvedValue(
        workouts as unknown as WorkoutPlan[],
      );

      const result = await service.generateWorkoutReport('u1');

      expect(result.message).toBe(
        SYS_MSG.WORKOUT_REPORT_GENERATED_SUCCESSFULLY,
      );
      expect(result.data.totalWorkouts).toBe(2);
      expect(result.data.completedWorkouts).toBe(1);
      expect(result.data.pendingWorkouts).toBe(1);
    });

    it('should throw RequestTimeoutException on error', async () => {
      modelAction.findAll.mockRejectedValue(new Error('fail'));
      await expect(service.generateWorkoutReport('u1')).rejects.toBeInstanceOf(
        RequestTimeoutException,
      );
    });
  });
});
