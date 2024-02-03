import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { ingredientPropTypes } from '../../utils/prop-types';

export const IngredientsList = ({ ingredients, handleModalIngredient }) => {
  return (
    <ul className={styles.list}>
      {ingredients.map((item) => {
        const count = 5; // временно для отображения счетчика
        return (
          <IngredientsCard
            key={item._id}
            ingredient={item}
            counter={count}
            handleModalIngredient={handleModalIngredient}
          />
        );
      })}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleModalIngredient: PropTypes.func.isRequired,
};
