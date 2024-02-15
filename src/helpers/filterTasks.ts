import { Task, TaskStatus, User } from '../shared/types';

export const filterTasks = (
  searchTerm: string,
  statusFilter: TaskStatus | 'all' = 'all',
  tasks: Task[],
  users: User[],
  from: string | null,
  to: string | null,
): Task[] => {
  const filteredTasks = tasks.filter((task) => {
    const user = users.find((user) => user.id === task.executorId);
    const executorName = user ? `${user.firstName} ${user.lastName}` : '';

    const matchesSearchTerm =
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      executorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.executorId.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;

    const deadlineWithinRange = (taskDeadline: string) => {
      if (from && new Date(taskDeadline) < new Date(from)) {
        return false;
      }
      if (to && new Date(taskDeadline) > new Date(to)) {
        return false;
      }
      return true;
    };

    return (
      matchesSearchTerm && matchesStatus && deadlineWithinRange(task.deadline)
    );
  });

  return filteredTasks;
};
