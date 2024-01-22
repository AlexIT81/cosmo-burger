import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';

export const BurgerConstructor = ({ ingredients, handleModalOrder }) => {
  const currentBun = ingredients.find((item) => item.type === 'bun');

  const totalSum = ingredients.reduce((result, item) => {
    return item.type === 'bun'
      ? (result += item.price * 2)
      : (result += item.price);
  }, 0);

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
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
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
      __v: PropTypes.number.isRequired,
    }),
  ).isRequired,
  handleModalOrder: PropTypes.func.isRequired,
};
