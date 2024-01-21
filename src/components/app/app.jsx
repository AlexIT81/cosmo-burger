import { useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';

function App() {
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(true);

  const closeModal = () => {
    setIsOpenModalIngredient(false);
    setIsOpenModalOrder(false);
  };

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients ingredients={data} />
          <BurgerConstructor ingredients={data} />
        </main>
      </div>
      {isOpenModalIngredient && (
        <Modal closeModal={closeModal} title='Детали ингредиента'>
          <IngredientDetails
            image="https://code.s3.yandex.net/react/code/bun-02.png"
            name="Краторная булка N-200i"
            calories="2674"
            proteins="400"
            fat="700"
            carbohydrates="652"
          />
        </Modal>
      )}
      {isOpenModalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber='034536' />
        </Modal>
      )}
    </>
  );
}

export default App;
