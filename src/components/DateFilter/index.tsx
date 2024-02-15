import { FC, useState } from 'react';

import styles from './styles.module.scss';

type DateFilterProps = {
  fromDate: string | null;
  onChangeFromDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toDate: string | null;
  onChangeToDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DateFilter: FC<DateFilterProps> = ({
  fromDate,
  toDate,
  onChangeFromDate,
  onChangeToDate,
}) => {
  return (
    <div className={styles.dateFilter}>
      <div className={styles.from}>
        Фильтровать дедлайн c{' '}
        <input
          type="date"
          value={fromDate ?? ''}
          max={toDate!}
          onChange={onChangeFromDate}
        />
      </div>
      <div className={styles.to}>
        по{' '}
        <input
          type="date"
          value={toDate ?? ''}
          min={fromDate!}
          onChange={onChangeToDate}
        />
      </div>
    </div>
  );
};
