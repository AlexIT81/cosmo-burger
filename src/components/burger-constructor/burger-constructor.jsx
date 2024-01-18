import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import { ConstructorTotal } from '../constructor-total/constructor-total';

export const BurgerConstructor = ({ingredients}) => {
  const setInitialBun = () => ingredients.find((item) => item.type === 'bun');
  const [currentBun, setCurrentBun] = useState(setInitialBun());

  const currencyBun = currentBun.price * 2;
  const totalSum = ingredients.reduce((result, item) => {
    return item.type !== 'bun' ? (result += item.price) : result;
  }, currencyBun);

  return (
    <section className='pt-25'>
      <div className='mr-4 ml-4 mb-4'>
        <ConstructorCard isDraggable={false} isLocked name={currentBun.name} price={currentBun.price} img={currentBun.image_mobile} type='top' extraClass='ml-4' />
      </div>
      
      <ul className={`${styles.list} pr-4 pl-4 mb-4`}>
      {ingredients.map((item) => {
        return item.type !== 'bun' && (<li key={item._id}><ConstructorCard isDraggable isLocked={false} name={item.name} price={item.price} img={item.image_mobile} /></li>)
      })}
      </ul>
      <div className='mr-4 ml-4 mb-10'>
        <ConstructorCard isDraggable={false} isLocked name={currentBun.name} price={currentBun.price} img={currentBun.image_mobile} type='bottom' />
      </div>
      <ConstructorTotal totalSum={totalSum} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
}; 