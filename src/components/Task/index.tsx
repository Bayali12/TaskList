import { FC, useState } from 'react';

import Modal from '../Modal';
import { User } from '../User';
import { TaskForm } from '../TaskForm';
import { Accordion } from '../Accordion';
import { SelectStatus } from '../StatusSelect';
import { useAppDispatch } from '../../hooks';
import { formatDate } from '../../helpers/formatDate';
import { TaskStatus, Task as TaskType } from '../../shared/types';
import { changeStatus, deleteTask } from '../../store/slices/taskSlice';
import users from '../../shared/data/users';
import deleteIcon from '../../assets/delete.svg';
import edit from '../../assets/edit.svg';

import styles from './styles.module.scss';

type TaskProps = {
  task: TaskType;
};

export const Task: FC<TaskProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const currentUser = users.find((user) => user.id === task.executorId);
  const [show, setShow] = useState(false);

  const handleChangeStatus = (status: TaskStatus) => {
    dispatch(changeStatus({ id: task.id, status }));
  };

  const handleClickDelete = () => {
    const conf = confirm('Вы действительно хотите удалить данную задачу?');
    conf && dispatch(deleteTask(task.id));
  };

  return (
    <>
      <div className={styles.task}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.name}>{task.name}</div>
            <SelectStatus value={task.status} onChange={handleChangeStatus} />
          </div>
          <Accordion title="Описание" content={task.description} />
          <div className={styles.bottom}>
            <div className={styles.info}>
              <div className={styles.createdAt}>
                Создано: {formatDate(task.createdAt)}
              </div>
              <div className={styles.deadline}>
                Дедлайн: {formatDate(task.deadline)}
              </div>
              <div className={styles.executor}>
                {currentUser && (
                  <User
                    id={currentUser.id}
                    firstName={currentUser.firstName}
                    lastName={currentUser.lastName}
                    avatar={currentUser.avatar}
                  />
                )}
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.button} onClick={handleClickDelete}>
                <img src={deleteIcon} alt="delete" />
              </button>
              <button className={styles.button} onClick={() => setShow(!show)}>
                <img src={edit} alt="edit" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onClose={() => setShow(false)}
        title="Редактирование задачи">
        <TaskForm isEdit task={task} onClose={() => setShow(false)} />
      </Modal>
    </>
  );
};
