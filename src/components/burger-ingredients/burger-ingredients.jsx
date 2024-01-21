import React, { useState, useEffect, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list/ingredients-list';

export const BurgerIngredients = ({ ingredients, handleModalIngredient }) => {
  const [current, setCurrent] = useState('bun');
  const bunArr = ingredients.filter((item) => item.type === 'bun');
  const sauceArr = ingredients.filter((item) => item.type === 'sauce');
  const mainArr = ingredients.filter((item) => item.type === 'main');

  // Прокрутка
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const scrollingElement = document.querySelector('.scrolling');
    const scrollToElement = (elementRef) => {
      scrollingElement.scrollTo({
        top: elementRef.current.scrollIntoView(),
        // top: elementRef.current.offsetTop - 284,
        behavior: 'smooth',
      });
    };
    if (current === 'sauce') {
      scrollToElement(sauceRef);
    } else if (current === 'main') {
      scrollToElement(mainRef);
    } else {
      scrollToElement(bunRef);
    }
  }, [current]);

  return (
    <section className='pt-10'>
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className='mb-10'>
        <ul className={styles['ingredients-menu']}>
          <li>
            <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
          </li>
          <li>
            <Tab
              value='sauce'
              active={current === 'sauce'}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
          </li>
          <li>
            <Tab value='main' active={current === 'main'} onClick={setCurrent}>
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${styles['cards-wrapper']} scrolling`}>
        <h2 className='text text_type_main-medium' ref={bunRef}>
          Булки
        </h2>
        <IngredientsList ingredients={bunArr} handleModalIngredient={handleModalIngredient} />
        <h2 className='text text_type_main-medium' ref={sauceRef}>
          Соусы
        </h2>
        <IngredientsList ingredients={sauceArr} handleModalIngredient={handleModalIngredient} />
        <h2 className='text text_type_main-medium' ref={mainRef}>
          Начинки
        </h2>
        <IngredientsList ingredients={mainArr} handleModalIngredient={handleModalIngredient} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.string.isRequired,
})).isRequired,
  handleModalIngredient: PropTypes.func.isRequired,
};
