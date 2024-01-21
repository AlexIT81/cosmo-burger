import styles from './order-details.module.css';
import doneIcon from '../../images/done.svg';

export const OrderDetails = ({ orderNumber }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.title}`}>{orderNumber}</h1>
      <span className="text text_type_main-medium mb-15">
        идентификатор заказа
      </span>
      <img src={doneIcon} alt='Заказ оформлен' className={styles.icon}/>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};
