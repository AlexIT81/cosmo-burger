import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
import { forgotPasswordRequest } from '../../utils/api';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { formValues, handleChange } = useForm({ email: '', emailError: false,});
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    forgotPasswordRequest(formValues.email)
      .then(() => {
        localStorage.setItem('forgotPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form name="forgot-password" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            error={formValues.emailError}
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
