import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

export const ForgotPassword = () => {
  const [formValue, setFormValue] = useState({
    email: '',
    emailError: false,
  });

  const emailRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const setFormData = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form name="forgot-password" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={setFormData}
            value={formValue.email}
            name="email"
            error={formValue.emailError}
            ref={emailRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{' '}
          <Link to="/login" className="main-link">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};
