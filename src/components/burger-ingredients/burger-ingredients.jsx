import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import { getInrgedients } from '../../services/actions/ingredients';
import { getInrgedientsSelector } from '../../utils/constants';

export const BurgerIngredients = ({ handleModalIngredient }) => {
  const dispatch = useDispatch();
  // получение ингредиентов из API
  useEffect(() => {
    dispatch(getInrgedients());
  }, [dispatch]);

  const ingredients = useSelector(getInrgedientsSelector);

  const [current, setCurrent] = useState('bun');
  const bunArr = ingredients.filter((item) => item.type === 'bun');
  const sauceArr = ingredients.filter((item) => item.type === 'sauce');
  const mainArr = ingredients.filter((item) => item.type === 'main');

  // Прокрутка
  const containerRef = useRef(null);
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

  // прокрутка с подсветкой
  const handleScroll = () => {
    const bunRefLength = Math.abs(containerRef.current.offsetTop - bunRef.current.getBoundingClientRect().top);
    const sauceRefLength = Math.abs(containerRef.current.offsetTop - sauceRef.current.getBoundingClientRect().top);
    const mainRefLength = Math.abs(containerRef.current.offsetTop - mainRef.current.getBoundingClientRect().top);
    // console.log(`${bunRefLength}  | ${sauceRefLength} | ${mainRefLength}`);
    if (bunRefLength < sauceRefLength && bunRefLength < mainRefLength) {
      setCurrent('bun');
    } else if (sauceRefLength < mainRefLength && sauceRefLength < bunRefLength) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  return (
    <section className="pt-10">
      <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
      <nav className="mb-10">
        <ul className={styles['ingredients-menu']}>
          <li>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
          </li>
          <li>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
              Соусы
            </Tab>
          </li>
          <li>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
              Начинки
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${styles['cards-wrapper']} scrolling`} onScroll={handleScroll} ref={containerRef}>
        <h2 className="text text_type_main-medium" ref={bunRef}>
          Булки
        </h2>
        <IngredientsList ingredients={bunArr} handleModalIngredient={handleModalIngredient} />
        <h2 className="text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h2>
        <IngredientsList ingredients={sauceArr} handleModalIngredient={handleModalIngredient} />
        <h2 className="text text_type_main-medium" ref={mainRef}>
          Начинки
        </h2>
        <IngredientsList ingredients={mainArr} handleModalIngredient={handleModalIngredient} />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  // ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleModalIngredient: PropTypes.func.isRequired,
};
