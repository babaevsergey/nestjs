import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockTasksRepository = () => ({
  getAllTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Serhii',
  id: 'someid',
  password: 'somepassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with taskService and taskRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and return the result', async () => {
      tasksRepository.getAllTasks.mockResolvedValue('someValue');
      const result = await tasksService.getAllTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    const mockTask = {
      title: 'Test title',
      description: 'Test desc',
      id: 'someid',
      status: TaskStatus.OPEN,
    };

    it('calls TaskRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById(mockTask.id, mockUser);
      expect(result).toEqual(mockTask);
    });
  });
});
