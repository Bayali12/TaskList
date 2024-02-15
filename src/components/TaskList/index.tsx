import { FC } from 'react';

import { Task } from '../Task';
import { Task as TaskType } from '../../shared/types';

import styles from './styles.module.scss';

export const TaskList: FC<{ tasks: Array<TaskType> }> = ({ tasks }) => {
  return (
    <>
      <div className={styles.taskList}>
        <h1 className={styles.title}>Список задач</h1>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};
