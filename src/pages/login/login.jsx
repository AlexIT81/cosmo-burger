import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { loginAction } from '../../services/actions/user/login';
import { isLoggedInSelector } from '../../services/selectors';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
  const dispatch = useDispatch();
  const { formValues, handleChange, setFormValues } = useForm({
    email: '',
    pass: '',
    emailError: false,
    passError: false,
    isShowPass: false,
  });

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValues.email && formValues.pass) {
      dispatch(loginAction(formValues.email, formValues.pass));
    }
  };

  // роутинг
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isLoggedIn) navigate(from, { replace: true });
  }, [isLoggedIn, navigate, from]);

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <form name="login" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="E-mail"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            error={formValues.emailError}
            ref={emailRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          <Input
            type={formValues.isShowPass ? 'text' : 'password'}
            placeholder="Пароль"
            onChange={handleChange}
            icon="ShowIcon"
            value={formValues.pass}
            name="pass"
            error={formValues.passError}
            ref={passRef}
            onIconClick={() => setFormValues({ ...formValues, isShowPass: !formValues.isShowPass })}
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
