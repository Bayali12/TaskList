import { ControlsBar } from '../../components/ControlsBar';

import styles from './styles.module.scss';

import { TaskList } from '../../components/TaskList/index.js';
import { useAppSelector } from '../../hooks/index.js';
import users from '../../shared/data/users.js';
import { filterTasks } from '../../helpers/filterTasks.js';

export const Home = () => {
  const { tasks, searchTerm, statusFilter, fromDate, toDate } = useAppSelector(
    (state) => state.tasksReducer,
  );

  const filteredTasks = tasks
    ? filterTasks(searchTerm, statusFilter, tasks, users, fromDate, toDate)
    : [];

  return (
    <div className={styles.home}>
      <ControlsBar />
      <TaskList tasks={filteredTasks} />
    </div>
  );
};
