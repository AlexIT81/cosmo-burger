import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './constructor-total.module.css';

export const ConstructorTotal = ({ totalSum }) => {
  return (
    <div className={`${styles.wrapper} pr-4 mt-5`}>
      <div>
        <span className='text text_type_main-large mr-2'>{totalSum}</span>
        <CurrencyIcon type='primary' />
      </div>
      <Button htmlType='button' type='primary' size='large'>
        Оформить заказ
      </Button>
    </div>
  );
};

ConstructorTotal.propTypes = {
  totalSum: PropTypes.number.isRequired,
};
