import { Outlet } from 'react-router-dom';

import { Header } from '../Header';

import styles from './styles.module.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};
