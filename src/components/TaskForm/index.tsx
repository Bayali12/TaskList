import { FC, FormEvent, useState } from 'react';

import { Select, SelectOption } from '../Select';
import { formatDate } from '../../helpers/formatDate';
import { addTask, editTask } from '../../store/slices/taskSlice';
import { useAppDispatch } from '../../hooks';
import { Task } from '../../shared/types';
import users from '../../shared/data/users';

import styles from './styles.module.scss';

type TaskFormProps = {
  task?: Task;
  isEdit?: boolean;
  onClose?: () => void;
};

export const TaskForm: FC<TaskFormProps> = ({
  task,
  isEdit = false,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [taskName, setTaskName] = useState<string>(task?.name || '');
  const [taskDescription, setTaskDescription] = useState<string>(
    task?.description || '',
  );
  const [selectedUser, setSelectedUser] = useState<number>(
    task?.executorId || 0,
  );
  const [deadline, setDeadline] = useState<string>(
    formatDate(task?.deadline || new Date().toISOString().split('T')[0]),
  );

  const options: Array<SelectOption> = users.map((user) => {
    return {
      label: `${user.firstName} ${user.lastName}`,
      value: String(user.id),
    };
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit) {
      dispatch(
        editTask({
          taskId: task!.id,
          updatedTask: {
            name: taskName,
            description: taskDescription,
            executorId: selectedUser,
            deadline,
          },
        }),
      );
    } else {
      dispatch(
        addTask({
          name: taskName,
          description: taskDescription,
          executorId: selectedUser,
          deadline,
        }),
      );
    }

    onClose?.();
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={(event) => handleSubmit(event)} className={styles.form}>
        <label>
          Название
          <br />
          <input
            type="text"
            value={taskName}
            maxLength={100}
            required
            onChange={(e) => setTaskName(e.target.value)}
          />
        </label>
        <label>
          Описание
          <br />
          <textarea
            value={taskDescription}
            maxLength={1000}
            required
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </label>
        <label>
          Исполнитель
          <br />
          <Select
            value={selectedUser || ''}
            options={options}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          />
        </label>
        <label>
          Дедлайн
          <br />
          <input
            type="date"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </label>
        <button type="submit">{isEdit ? 'Сохранить' : 'Добавить'}</button>
      </form>
    </div>
  );
};
