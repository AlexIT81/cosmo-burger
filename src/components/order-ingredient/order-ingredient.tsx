import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-ingredient.module.css';
import { IOrderIngredient } from '../../utils/types';

export const OrderIngredient: FC<IOrderIngredient> = ({ name, image, price, quantity}) => {
  return (
    <li className={styles.element}>
    <img
      className={styles.img}
      src={image}
      alt={name}
    />
    <p className={styles.name}>{name}</p>
    <div className={`${styles['price-wrapper']}`}>
      <span className={styles.price}>{quantity} x {price}</span>
      <CurrencyIcon type="primary" />
    </div>
  </li>
  );
};