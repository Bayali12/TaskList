import { FC } from 'react';
import classNames from 'classnames';

import { Select, SelectOption } from '../Select';
import { HumanStatus, TaskStatus } from '../../shared/types';

import styles from './styles.module.scss';

type SelectStatusProps = {
  value?: TaskStatus;
  className?: string;
  onChange: (e: TaskStatus) => void;
};

export const SelectStatus: FC<SelectStatusProps> = ({
  value,
  className,
  onChange,
}) => {
  const options: Array<SelectOption> = [
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

  return (
    <Select
      value={value}
      options={options}
      className={classNames(styles.status, value && styles[value], className)}
      onChange={(e) => onChange(e.target.value as TaskStatus)}
    />
  );
};
