import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import { registerAction } from '../../services/actions/user/register';
import { useForm } from '../../hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch<any>();
  const { formValues, handleChange } = useForm({
    name: '',
    email: '',
    pass: '',
    nameError: false,
    emailError: false,
    passError: false,
  });
  const [isShowPass, setIsShowPass] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValues.name && formValues.email && formValues.pass) {
      dispatch(registerAction(formValues.email, formValues.pass, formValues.name));
    }
  };

  return (
    <main className={styles.primary}>
      <section className={styles.wrapper}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <form name="register" className={styles.form} onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            value={formValues.name}
            name="name"
            error={formValues.nameError}
            errorText="Введите в формате..."
            size="default"
            extraClass="mb-6"
          />
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
