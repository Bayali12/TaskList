import { FC } from 'react';

import { User as UserProps } from '../../shared/types';

import styles from './styles.module.scss';

export const User: FC<UserProps> = ({ firstName, lastName, avatar }) => {
  return (
    <div className={styles.user}>
      <span className={styles.fullName}>{`${firstName} ${lastName}`}</span>
      <img className={styles.avatar} src={avatar} alt="userAvatar" />
    </div>
  );
};
