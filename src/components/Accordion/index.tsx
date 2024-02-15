import { FC, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames';
import arrow from '../../assets/arrow_down.svg';

import styles from './styles.module.scss';

type AccordionProps = {
  title: string;
  content: ReactNode;
};

export const Accordion: FC<AccordionProps> = ({ title, content }) => {
  const [active, setActive] = useState(false);
  const contentRef: React.RefObject<HTMLDivElement> = useRef(null);
  const [height, setHeight] = useState('0px');

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? '0px' : `${contentRef.current?.scrollHeight}px`);
  }

  return (
    <div className={styles.accordionWrapper}>
      <button
        className={classNames(styles.accordion, { [styles.active]: active })}
        onClick={toggleAccordion}>
        <p className={styles.accordionTitle}>{title}</p>
        <img src={arrow} alt="arrow" />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: `${height}` }}
        className={styles.accordionContent}>
        <div className={styles.accordionText}>{content}</div>
      </div>
    </div>
  );
};
