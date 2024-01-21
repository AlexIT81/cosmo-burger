import React from 'react';
import styles from './ingredient-details.module.css';

export const IngredientDetails = ({
  image,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <div className={styles.wrapper}>
      <img src={image} alt={name} className={styles.image} />
      <h2 className={styles.title}>{name}</h2>
      <ul className={styles.nutritionals}>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Калории,ккал</h3>
          <p className={`${styles['nutritional-value']}`}>{calories}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Белки, г</h3>
          <p className={`${styles['nutritional-value']}`}>{proteins}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Жиры, г</h3>
          <p className={`${styles['nutritional-value']}`}>{fat}</p>
        </li>
        <li className={`${styles['nutritional-wrapper']}`}>
          <h3 className={`${styles['nutritional-title']}`}>Углеводы, г</h3>
          <p className={`${styles['nutritional-value']}`}>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};
