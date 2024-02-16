import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import { resetPasswordRequest } from '../../utils/api';
import { useForm } from '../../hooks/useForm';

export const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const forgotPasswordCheck = localStorage.getItem('forgotPassword');
    if (!forgotPasswordCheck) {
      navigate('/forgot-password', { replace: true });
    }
  });

  const { formValues, handleChange, setFormValues } = useForm({
    code: '',
    pass: '',
    codeError: false,
    passError: false,
    isShowPass: false,
  });

  const [apiError, setApiError] = useState('');

  const codeRef = useRef(null);
  const passRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (formValues.code && formValues.pass) {
      resetPasswordRequest({ password: formValues.pass, token: formValues.code })
        .then(() => {
          localStorage.removeItem('forgotPassword');
          setApiError('');
          navigate('/login', { replace: true });
        })
        .catch((err) => {
          setApiError('Указанный токен не найден!');
          // eslint-disable-next-line no-console
          console.log(err.message);
        });
    }
  };

  const setFormData = (e) => {
    if (apiError) setApiError('');
    handleChange(e);
  };

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <form name="reset-password" className={styles.form} onSubmit={onSubmit}>
          <Input
            type={formValues.isShowPass ? 'text' : 'password'}
            placeholder="Введите новый пароль"
            onChange={setFormData}
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
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={setFormData}
            value={formValues.code}
            name="code"
            error={formValues.codeError}
            ref={codeRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
          />
          {apiError && <p className={styles['api-error']}>{apiError}</p>}
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
