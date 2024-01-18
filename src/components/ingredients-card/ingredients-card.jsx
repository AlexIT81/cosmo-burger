import React from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredients-card.module.css';

export const IngredientsCard = ({ image, name, price, counter }) => {
  return (
    <li className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles['price-wrapper']}>
        <span className='text text_type_digits-medium'>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
      {!!counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
    </li>
  );
};

IngredientsCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  counter: PropTypes.number,
};

IngredientsCard.defaultProps = {
  counter: 0,
};