import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-item.module.css';
import { IBurgerItem } from '../../utils/types';
import { VISIBLE_IMAGES_COUNT } from '../../utils/constants';

export const BurgerItem: FC<IBurgerItem> = ({ name, number, data, images, price, status }) => {
  const location = useLocation();

  const getStatus = () => {
    if (status === 'created') {
      return <span className={styles.status}>Создан</span>;
    }
    if (status === 'pending') {
      return <span className={styles.status}>Готовится</span>;
    }
    if (status === 'done') {
      return <span className={`${styles.status} ${styles.done}`}>Выполнен</span>;
    }
    return null;
  };

  return (
    // <Link to={`/feed/${number.toString()}`} state={{ backgroundLocation: location }} className={styles.link}>
    <Link to={`/feed/${number.toString()}`} className={styles.link}>
      <li className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.number}>{number}</p>
          <span className={styles.data}>
            <FormattedDate date={new Date(data)} />
          </span>
        </div>
        <div>
          <h2 className={styles.title}>{name}</h2>
          {location.pathname === '/feed' && status && getStatus()}
        </div>
        <div className={styles.main}>
          <div className={styles.gallery}>
            {images.slice(0, VISIBLE_IMAGES_COUNT).map((image, index) => {
              return (
                <img
                  key={uuidv4()}
                  style={{ zIndex: ` ${images.length - index}` }}
                  alt=""
                  src={image}
                  className={styles.img}
                />
              );
            })}
            {images.length > VISIBLE_IMAGES_COUNT ? (
              <p className={styles.count}>+{images.length - VISIBLE_IMAGES_COUNT}</p>
            ) : (
              ''
            )}
          </div>
          <div className={styles.price}>
            <span className='text text_type_digits-default'>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
};
