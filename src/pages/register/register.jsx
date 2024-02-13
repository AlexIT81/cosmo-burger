import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

export const Register = () => {
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    pass: '',
    nameError: false,
    emailError: false,
    passError: false,
  });

  const [isShowPass, setIsShowPass] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

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
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <form name="register" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={setFormData}
            value={formValue.name}
            name="name"
            error={formValue.nameError}
            ref={nameRef}
            errorText="Введите в формате..."
            size="default"
            extraClass="mb-6"
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{' '}
          <Link to="/login" className="main-link">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
};
