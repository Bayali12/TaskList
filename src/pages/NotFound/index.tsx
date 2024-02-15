import notFound from '../../assets/404.svg';

import styles from './styles.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.page404}>
      <img src={notFound} alt="404" />
      <div>К сожалению, страница, которую вы ищете, не существует.</div>
    </div>
  );
};
