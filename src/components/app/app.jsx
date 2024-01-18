import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { data } from '../../utils/data';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={`${styles.App} mb-10`}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </main>
    </div>
  );
};

export default App;
