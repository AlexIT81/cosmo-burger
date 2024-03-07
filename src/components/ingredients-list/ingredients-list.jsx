import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { ingredientPropTypes } from '../../utils/prop-types';

export const IngredientsList = ({ ingredients }) => {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingredient) => {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <IngredientsCard key={ingredient._id} {...ingredient} />;
      })}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
};
