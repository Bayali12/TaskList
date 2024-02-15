import { useState } from 'react';

import Modal from '../Modal';
import { TaskForm } from '../TaskForm';
import { DateFilter } from '../DateFilter';
import { Select, SelectOption } from '../Select';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  changeStatusFilter,
  resetFilter,
  setFromDate,
  setSearchTerm,
  setToDate,
} from '../../store/slices/taskSlice';
import { HumanStatus, TaskStatus } from '../../shared/types';
import plus from '../../assets/plus.svg';
import search from '../../assets/search.svg';

import styles from './styles.module.scss';

const options: Array<SelectOption> = [
  {
    label: 'all',
    value: 'all',
  },
  {
    label: HumanStatus.readyToGo,
    value: 'readyToGo',
  },
  {
    label: HumanStatus.inProgress,
    value: 'inProgress',
  },
  {
    label: HumanStatus.done,
    value: 'done',
  },
];

export const ControlsBar = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, statusFilter, fromDate, toDate } = useAppSelector(
    (state) => state.tasksReducer,
  );
  const [show, setShow] = useState(false);

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setSearchTerm(value));
  };

  return (
    <>
      <div className={styles.controlsBar}>
        <button className={styles.addBtn} onClick={() => setShow(!show)}>
          <img src={plus} alt="plus" />
          Добавить задачу
        </button>
        <div className={styles.searchWrapper}>
          <img className={styles.searchIcon} src={search} alt="search icon" />
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            className={styles.searchInput}
            type="text"
            placeholder="Поиск ..."
          />
        </div>

        <Select
          className={styles.filterSelect}
          options={options}
          defaultValue={'all'}
          value={statusFilter}
          onChange={(e) =>
            dispatch(changeStatusFilter(e.target.value as TaskStatus | 'all'))
          }
        />
        <DateFilter
          toDate={toDate}
          fromDate={fromDate}
          onChangeToDate={(e) => dispatch(setToDate(e.target.value))}
          onChangeFromDate={(e) => dispatch(setFromDate(e.target.value))}
        />

        <button
          onClick={() => dispatch(resetFilter())}
          className={styles.resetBtn}>
          Cброс
        </button>
      </div>

      <Modal
        show={show}
        onClose={() => setShow(false)}
        title="Добавление задачи">
        <TaskForm onClose={() => setShow(false)} />
      </Modal>
    </>
  );
};
