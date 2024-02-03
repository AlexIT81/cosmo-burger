import { useDispatch, useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { getCurrentInrgedientSelector } from '../../utils/constants';

export const IngredientDetails = () => {
  const currentIngredient = useSelector(getCurrentInrgedientSelector);
  return (
    <div className={styles.wrapper}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} className={styles.image} />
      <h2 className={styles.title}>{currentIngredient.name}</h2>
      <ul className={styles.nutritionals}>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Калории,ккал</h3>
          <p className={`${styles['nutritional-value']}`}>{currentIngredient.calories}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Белки, г</h3>
          <p className={`${styles['nutritional-value']}`}>{currentIngredient.proteins}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Жиры, г</h3>
          <p className={`${styles['nutritional-value']}`}>{currentIngredient.fat}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Углеводы, г</h3>
          <p className={`${styles['nutritional-value']}`}>{currentIngredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};

// IngredientDetails.propTypes = {
//   currentIngredient: ingredientPropTypes.isRequired,
// };