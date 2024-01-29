import PropTypes from 'prop-types';
import { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';
import { ingredientPropTypes } from '../../utils/prop-types';

export const BurgerConstructor = ({ ingredients, handleModalOrder }) => {
  const currentBun = ingredients.find((item) => item.type === 'bun');

  const totalSum = useMemo(() => {
    return ingredients.reduce((result, item) => {
      return item.type === 'bun'
        ? (result += item.price * 2)
        : (result += item.price);
    }, 0);
  }, [ingredients]);

  return (
    <section className="pt-25">
      {totalSum && currentBun && (
        <>
          <div className="mr-4 ml-4 mb-4">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${currentBun.name} (верх)`}
              price={currentBun.price}
              img={currentBun.image_mobile}
              type="top"
              extraClass="ml-4"
            />
          </div>
          <ul className={`${styles.list} pr-4 pl-4 mb-4`}>
            {ingredients.map((item) => {
              return (
                item.type !== 'bun' && (
                  <li key={item._id}>
                    <ConstructorCard
                      isDraggable
                      isLocked={false}
                      name={item.name}
                      price={item.price}
                      img={item.image_mobile}
                    />
                  </li>
                )
              );
            })}
          </ul>
          <div className="mr-4 ml-4 mb-10">
            <ConstructorCard
              isDraggable={false}
              isLocked
              name={`${currentBun.name} (низ)`}
              price={currentBun.price}
              img={currentBun.image_mobile}
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
  ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
  handleModalOrder: PropTypes.func.isRequired,
};
