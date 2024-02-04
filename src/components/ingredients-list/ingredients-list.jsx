import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { ingredientPropTypes } from '../../utils/prop-types';
import { getAllBurgerParts } from '../../utils/constants';

export const IngredientsList = ({ ingredients, handleModalIngredient }) => {
  return (
    <ul className={styles.list}>
      {ingredients.map((item) => {
        return (
          <IngredientsCard
            key={item._id}
            ingredient={item}
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
