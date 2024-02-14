import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {  } from '../../utils/api';
import { loginAction } from '../../services/actions/user/login';

export const Login = () => {
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: '',
    pass: '',
    emailError: false,
    passError: false,
  });

  const [isShowPass, setIsShowPass] = useState(false);

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('here')
    if (formValue.email && formValue.pass) {
      dispatch(loginAction(formValue.email, formValue.pass))
    }
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
        <h1 className="text text_type_main-medium">Вход</h1>
        <form name="login" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="E-mail"
            onChange={setFormData}
            value={formValue.email}
            name="email"
            error={formValue.emailError}
            ref={emailRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          <Input
            type={isShowPass ? 'text' : 'password'}
            placeholder="Пароль"
            onChange={setFormData}
            icon="ShowIcon"
            value={formValue.pass}
            name="pass"
            error={formValue.passError}
            ref={passRef}
            onIconClick={() => setIsShowPass(!isShowPass)}
            errorText="Только латиница, цифры и спец. символы"
            size="default"
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Войти
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{' '}
          <Link to="/register" className="main-link">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to="/forgot-password" className="main-link">
            Восстановить пароль
          </Link>
        </p>
      </section>
    </main>
  );
};
