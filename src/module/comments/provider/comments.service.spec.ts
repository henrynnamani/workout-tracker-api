import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Comment } from '../model/comment.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ModelAction } from '@/shared/services/model-action.service';
import { RequestTimeoutException } from '@nestjs/common';
import { IComment } from '@/types/comment';

jest.mock('@/shared/services/model-action.service', () => ({
  ModelAction: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
  })),
}));

describe('CommentsService', () => {
  let service: CommentsService;
  let modelAction: jest.Mocked<ModelAction<Comment>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository, // or useValue mock repo
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    modelAction = (service as any).modelAction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addComment', () => {
    it('should create a comment record successfully', async () => {
      const mockInput: IComment = {
        content: 'Nice workout',
        userId: 'u1',
        workoutPlanId: 'w1',
      };
      const mockRecord = {
        id: 'c1',
        content: 'Nice workout',
        user: { id: 'u1' },
        workoutPlan: { id: 'w1' },
      } as any;

      modelAction.create.mockResolvedValue(mockRecord);

      const result = await service.addComment(mockInput);

      expect(modelAction.create).toHaveBeenCalledWith({
        content: mockInput.content,
        user: { id: mockInput.userId },
        workoutPlan: { id: mockInput.workoutPlanId },
      });
      expect(result).toBe(mockRecord);
    });

    it('should throw RequestTimeoutException on error', async () => {
      const mockInput: IComment = {
        content: 'Nice workout',
        userId: 'u1',
        workoutPlanId: 'w1',
      };
      modelAction.create.mockRejectedValue(new Error('DB down'));

      await expect(service.addComment(mockInput)).rejects.toBeInstanceOf(
        RequestTimeoutException,
      );
    });
  });
});
