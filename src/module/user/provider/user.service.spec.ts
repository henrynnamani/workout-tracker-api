import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from '../model/user.entity';
import { ModelAction } from '@/shared/services/model-action.service';
import { RequestTimeoutException } from '@nestjs/common';
import { IUser } from 'src/types/user';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('@/shared/services/model-action.service', () => ({
  ModelAction: jest.fn().mockImplementation(() => ({
    create: jest.fn(),
    findBy: jest.fn(),
  })),
}));

const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let modelAction: jest.Mocked<ModelAction<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    modelAction = (service as any).modelAction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should call create and return the new user', async () => {
      const input: IUser = {
        name: 'user',
        email: 'test@example.com',
        password: 'pass123',
      };
      const mockUser = {
        id: 'u1',
        email: 'test@example.com',
        password: 'pass123',
      } as any;

      modelAction.create.mockResolvedValue(mockUser);

      const result = await service.createUser(input);

      expect(modelAction.create).toHaveBeenCalledWith(input);
      expect(result).toBe(mockUser);
    });

    it('should throw RequestTimeoutException on error', async () => {
      const input: IUser = {
        name: 'user',
        email: 'test@example.com',
        password: 'pass123',
      };
      modelAction.create.mockRejectedValue(new Error('DB error'));

      await expect(service.createUser(input)).rejects.toBeInstanceOf(
        RequestTimeoutException,
      );
    });
  });

  describe('userExistByEmail', () => {
    it('should return result of findBy when successful', async () => {
      const email = 'exists@example.com';
      const mockResult = [{ id: 'u1', email }] as any;
      modelAction.findBy.mockResolvedValue(mockResult);

      const result = await service.userExistByEmail(email);

      expect(modelAction.findBy).toHaveBeenCalledWith({ email });
      expect(result).toBe(mockResult);
    });

    it('should throw RequestTimeoutException on error', async () => {
      const email = 'error@example.com';
      modelAction.findBy.mockRejectedValue(new Error('DB error'));

      await expect(service.userExistByEmail(email)).rejects.toBeInstanceOf(
        RequestTimeoutException,
      );
    });
  });
});
