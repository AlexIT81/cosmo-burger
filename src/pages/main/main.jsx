import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor'
import styles from './main.module.css'

export const Main = ({handleModalIngredient, handleModalOrder}) => {
  return (
    <main className={styles.main}>
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients handleModalIngredient={handleModalIngredient} />
      <BurgerConstructor handleModalOrder={handleModalOrder} />
    </DndProvider>
  </main>
  )
}
