import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { IngredientsCard } from '../ingredients-card/ingredients-card';

export const IngredientsList = ({ingredients}) => {
  return (
    <ul className={styles.list}>
      {ingredients.map((item) => {
        const count = Math.round(Math.random());
        return <IngredientsCard key={item._id} image={item.image} name={item.name} price={item.price} counter={count} />
      })}
    </ul>
  );
};


IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
}