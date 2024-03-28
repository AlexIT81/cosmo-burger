import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import styles from './ingredients.module.css';
import { getInrgedientsSelector } from '../../services/selectors';
import { Preloader } from '../../components/preloader/preloader';
import { IIngredient } from '../../utils/types';
import { useSelector } from '../../services/hooks';

export const IngredientView = () => {
  const [currentIngredient, setCurrentIngredient] = useState<IIngredient>();
  const { id } = useParams();
  const ingredients = useSelector(getInrgedientsSelector);

  useMemo(() => {
    setCurrentIngredient(ingredients.find((item: IIngredient) => item._id === id));
  }, [id, ingredients]);

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        {currentIngredient ? (
          <>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
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
          </>
        ) : (
          <Preloader />
        )}
      </section>
    </main>
  );
};
