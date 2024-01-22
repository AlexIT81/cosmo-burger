import { useLayoutEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
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

  const [errorMsg, setErrorMsg] = useState('');

  function getIngredients() {
    return apiData()
      .then((res) => {
        setIngredients(res.data);
        if (errorMsg) setErrorMsg('');
      })
      .catch(() => {
        setErrorMsg('Произошла ошибка при запросе данных. Пожалуйста, зайдите позже.');
      });
  }

  useLayoutEffect(() => {
    getIngredients();
  }, []);

  const handleModalOrder = () => {
    setOrderNumber('034536');
    setIsOpenModalOrder(true);
  };

  const handleModalIngredient = (id) => {
    setCurrentIngredient(ingredients.find((item) => item._id === id));
    setIsOpenModalIngredient(true);
  };

  const closeModal = () => {
    setIsOpenModalIngredient(false);
    setIsOpenModalOrder(false);
    setCurrentIngredient({});
  };

  return (
    <>
      <div className={`${styles.App} mb-10`}>
        <AppHeader />
        {errorMsg ? <p style={{textAlign: 'center'}}>{errorMsg}</p> : 
        (<main className={styles.main}>
          <BurgerIngredients
            ingredients={ingredients}
            handleModalIngredient={handleModalIngredient}
          />
          <BurgerConstructor
            ingredients={ingredients}
            handleModalOrder={handleModalOrder}
          />
          </main>)}
      </div>
      {isOpenModalIngredient && (
        <Modal closeModal={closeModal} title="Детали ингредиента">
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
