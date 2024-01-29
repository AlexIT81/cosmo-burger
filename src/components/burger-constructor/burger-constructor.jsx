import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';
// import { ingredientPropTypes } from '../../utils/prop-types';
import { IngredientsDataContext } from '../../services/ingredientsContext';

export const BurgerConstructor = ({ handleModalOrder }) => {
  const { ingredientsData } = useContext(IngredientsDataContext);

  const totalSum = useMemo(() => {
    if (ingredientsData.ingredients && ingredientsData.bun) {
      return ingredientsData.ingredients.reduce((result, item) => {
        return result += item.price;
      }, ingredientsData.bun.price * 2);
    }
    return 0
  }, [ingredientsData.ingredients, ingredientsData.bun]);

  return (
    <section className="pt-25">
      {totalSum && ingredientsData.bun && (
        <>
          <div className="mr-4 ml-4 mb-4">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${ingredientsData.bun.name} (верх)`}
              price={ingredientsData.bun.price}
              img={ingredientsData.bun.image_mobile}
              type="top"
              extraClass="ml-4"
            />
          </div>
          <ul className={`${styles.list} pr-4 pl-4 mb-4`}>
            {ingredientsData.ingredients.map((item) => {
              return (
                  <li key={item._id}>
                    <ConstructorCard
                      isDraggable
                      id={item._id}
                      isLocked={false}
                      name={item.name}
                      price={item.price}
                      img={item.image_mobile}
                    />
                  </li>
              );
            })}
          </ul>
          <div className="mr-4 ml-4 mb-10">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${ingredientsData.bun.name} (низ)`}
              price={ingredientsData.bun.price}
              img={ingredientsData.bun.image_mobile}
              type="bottom"
            />
          </div>
          <ConstructorTotal
            totalSum={totalSum}
            handleModalOrder={handleModalOrder}
          />
        </>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  // ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleModalOrder: PropTypes.func.isRequired,
};
