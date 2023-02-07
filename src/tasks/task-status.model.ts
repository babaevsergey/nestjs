import { TaskStatus } from './task-status.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
