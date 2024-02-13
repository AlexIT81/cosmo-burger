import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { resetPasswordRequest } from '../../utils/api';

export const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const forgotPasswordCheck = localStorage.getItem('forgotPassword');
    if (!forgotPasswordCheck) {
      navigate('/forgot-password', { replace: true });
    }
  });

  const [formValue, setFormValue] = useState({
    code: '',
    pass: '',
    codeError: false,
    passError: false,
  });

  const [isShowPass, setIsShowPass] = useState(false);

  const codeRef = useRef(null);
  const passRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValue.code && formValue.pass) {
      resetPasswordRequest({ password: formValue.pass, token: formValue.code })
        .then(() => {
          localStorage.removeItem('forgotPassword');
          navigate('/login', { replace: true });
        })
        .catch((err) => console.log(err));
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
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form name="reset-password" className={styles.form} onSubmit={onSubmit}>
          <Input
            type={isShowPass ? 'text' : 'password'}
            placeholder="Введите новый пароль"
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
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={setFormData}
            value={formValue.code}
            name="code"
            error={formValue.codeError}
            ref={codeRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
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
