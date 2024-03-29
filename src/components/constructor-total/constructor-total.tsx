import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-total.module.css';
import { isLoggedInSelector } from '../../services/selectors';
import { IConstructorTotal } from '../../utils/types';
import { useSelector } from '../../services/hooks';

export const ConstructorTotal: FC<IConstructorTotal> = ({ totalSum, handleModalOrder }) => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const navigate = useNavigate();

  const onModalOrder = () => {
    if (isLoggedIn) {
      handleModalOrder();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`${styles.wrapper} pr-4 mt-5`}>
      <div>
        <span className="text text_type_main-large mr-2">{totalSum}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onModalOrder}>
        Оформить заказ
      </Button>
    </div>
  );
};
