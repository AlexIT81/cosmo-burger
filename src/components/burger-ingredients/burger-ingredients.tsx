import { useState, useEffect, useRef, RefObject, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import { getInrgedientsSelector } from '../../services/selectors';
import { IIngredient, IIngredientWithId } from '../../utils/types';
import { useSelector } from '../../services/hooks';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(getInrgedientsSelector);

  const [current, setCurrent] = useState('bun');
  const bunArr = ingredients.filter((item: IIngredient) => item.type === 'bun');
  const sauceArr = ingredients.filter((item: IIngredient) => item.type === 'sauce');
  const mainArr = ingredients.filter((item: IIngredient) => item.type === 'main');

  // Прокрутка
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const scrollToElement = (elementRef: RefObject<HTMLHeadingElement | HTMLDivElement>): void => {
      if (elementRef && elementRef.current) elementRef.current.scrollIntoView();
    };

    if (current === 'sauce') {
      scrollToElement(sauceRef);
    } else if (current === 'main') {
      scrollToElement(mainRef);
    } else {
      scrollToElement(bunRef);
    }
  }, [current]);

  // Прокрутка с подсветкой
  const handleScroll = () => {
    if (containerRef.current && bunRef.current && sauceRef.current && mainRef.current) {
      const containerLength = containerRef.current.offsetTop;
      const bunRefLength = Math.abs(containerLength - bunRef.current.getBoundingClientRect().top);
      const sauceRefLength = Math.abs(containerLength - sauceRef.current.getBoundingClientRect().top);
      const mainRefLength = Math.abs(containerLength - mainRef.current.getBoundingClientRect().top);

      if (bunRefLength < sauceRefLength && bunRefLength < mainRefLength) {
        setCurrent('bun');
      } else if (sauceRefLength < mainRefLength && sauceRefLength < bunRefLength) {
        setCurrent('sauce');
      } else {
        setCurrent('main');
      }
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
