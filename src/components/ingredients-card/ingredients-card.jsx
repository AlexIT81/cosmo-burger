import React from 'react';
import { useDispatch } from 'react-redux';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './ingredients-card.module.css';
import { ingredientPropTypes } from '../../utils/prop-types';
import { addIngredient } from '../../services/actions/ingredient';
import { addBurgerIngredient } from '../../services/actions/burger';

export const IngredientsCard = ({ ingredient, counter, handleModalIngredient }) => {
  const dispatch = useDispatch();

  const onModalIngredient = () => {
    handleModalIngredient();
    dispatch(addIngredient(ingredient));
    dispatch(addBurgerIngredient(ingredient)) // удалить когда будет DND
  }
  return (
    <li className={styles.card} onClick={onModalIngredient} role="tab">
      <img src={ingredient.image_large} alt={ingredient.name} className={styles.image} />
      <div className={styles['price-wrapper']}>
        <span className='text text_type_digits-medium'>{ingredient.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>{ingredient.name}</h3>
      {!!counter && <Counter count={counter} size='default' extraClass={styles.counter} />}
    </li>
  );
};

IngredientsCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  counter: PropTypes.number,
  handleModalIngredient: PropTypes.func.isRequired,
};

IngredientsCard.defaultProps = {
  counter: 0,
};