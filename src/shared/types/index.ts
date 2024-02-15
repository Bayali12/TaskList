export type TaskStatus = 'readyToGo' | 'inProgress' | 'done';

export type Task = {
  id: string;
  name: string;
  description: string;
  executorId: number;
  status: TaskStatus;
  deadline: string;
  createdAt: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

export enum HumanStatus {
  readyToGo = 'готова к работе',
  inProgress = 'взята в работу',
  done = 'выполнена',
}
