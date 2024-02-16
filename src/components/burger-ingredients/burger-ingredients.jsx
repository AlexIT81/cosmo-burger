import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import { getInrgedientsSelector } from '../../services/selectors';

export const BurgerIngredients = () => {
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
        <IngredientsList ingredients={bunArr} />
        <h2 className="text text_type_main-medium" ref={sauceRef}>
          Соусы
        </h2>
        <IngredientsList ingredients={sauceArr} />
        <h2 className="text text_type_main-medium" ref={mainRef}>
          Начинки
        </h2>
        <IngredientsList ingredients={mainArr} />
      </div>
    </section>
  );
};
