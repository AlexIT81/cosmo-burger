import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { loginAction } from '../../services/actions/user/login';
import { isLoggedInSelector } from '../../services/selectors';
import { useForm } from '../../hooks/useForm';

export const Login: FC = () => {
  const dispatch = useDispatch<any>();
  const { formValues, handleChange } = useForm({
    email: '',
    pass: '',
    emailError: false,
    passError: false,
  });
  const [isShowPass, setIsShowPass] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
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

  const setShowPass = () => {
    setIsShowPass(!isShowPass);
  }

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
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          <Input
            type={isShowPass ? 'text' : 'password'}
            placeholder="Пароль"
            onChange={handleChange}
            icon="ShowIcon"
            value={formValues.pass}
            name="pass"
            error={formValues.passError}
            onIconClick={setShowPass}
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
