import { FC } from 'react';
import styles from './ingredients-list.module.css';
import { IngredientsCard } from '../ingredients-card/ingredients-card';
import { IIngredientsList } from '../../utils/types';

export const IngredientsList: FC<IIngredientsList> = ({ingredients}) => {
  return (
    <ul className={styles.list}>
      {ingredients.map((ingredient) => {
        return <IngredientsCard key={ingredient._id} {...ingredient} />;
      })}
    </ul>
  );
};
