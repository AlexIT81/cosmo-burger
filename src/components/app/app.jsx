import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderDetails } from '../order-details/order-details';
import { apiData } from '../../utils/api';

function App() {
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const [orderNumber, setOrderNumber] = useState(0);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const [ingredients, setIngredients] = useState([]);

  const getIngredient = () => {
    return apiData().then((res) => {
      setIngredients(res.data)
    })
    .catch((err) => {
      console.log('Ошибка API!');
    });
  }

  useEffect(() => {
    getIngredient();
  }, [])


  const handleModalOrder = () => {
    setOrderNumber('034536');
    setIsOpenModalOrder(true);
  }

  const handleModalIngredient = (id) => {
    setCurrentIngredient(data.find((item) => item._id === id));
    setIsOpenModalIngredient(true);
  }

  const closeModal = () => {
    setIsOpenModalIngredient(false);
    setIsOpenModalOrder(false);
    setCurrentIngredient({});
  };

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients ingredients={data} handleModalIngredient={handleModalIngredient} />
          <BurgerConstructor ingredients={data} handleModalOrder={handleModalOrder} />
        </main>
      </div>
      {isOpenModalIngredient && (
        <Modal closeModal={closeModal} title='Детали ингредиента'>
          <IngredientDetails
            image={currentIngredient.image}
            name={currentIngredient.name}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            fat={currentIngredient.fat}
            carbohydrates={currentIngredient.carbohydrates}
          />
        </Modal>
      )}
      {isOpenModalOrder && (
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default App;
