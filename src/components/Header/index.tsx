import logo from '../../assets/logo.svg';

import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src={logo} alt="logo" />
        TASKLIST
      </div>
    </header>
  );
};
