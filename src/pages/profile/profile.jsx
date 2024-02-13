import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';

export const Profile = () => {
  const [formValue, setFormValue] = useState({
    name: 'Марк',
    nameError: false,
    nameDisabled: true,
    email: 'mail@stellar.burgers',
    emailError: false,
    emailDisabled: true,
    pass: '123456',
    passError: false,
    passDisabled: true,
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const setFormData = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onIconClick = (string) => {
    const key = `${string}Disabled`;
    setFormValue({
      ...formValue,
      nameDisabled: true,
      emailDisabled: true,
      passDisabled: true,
      [key]: !formValue[key],
    });
  };

  useEffect(() => {
    if (!formValue.nameDisabled) {
      // nameRef.current.setSelectionRange(nameRef.current.value.length, nameRef.current.value.length);
      nameRef.current.focus();
    } else if (!formValue.emailDisabled) {
      // emailRef.current.type = 'text';
      // emailRef.current.setSelectionRange(0, emailRef.current.value.length);
      emailRef.current.focus();
      // emailRef.current.type = 'email';
    } else if (!formValue.passDisabled) {
      // passRef.current.setSelectionRange(passRef.current.value.length, passRef.current.value.length);
      passRef.current.focus();
    }
  }, [formValue.nameDisabled, formValue.emailDisabled, formValue.passDisabled]);

  // const onBlur = (string) => {
  //   const key = `${string}Disabled`;
  //   setFormValue({
  //     ...formValue,
  //     [key]: !formValue[key],
  //   });
  // };

  return (
    <main>
      <section className={styles.wrapper}>
        <div className={styles['navigation-block']}>
          <nav className="mb-20">
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="/profile" className={`${styles.link} ${styles.link_active}`}>
                  Профиль
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/profile/orders" className={`${styles.link}`}>
                  История заказов
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="/logout" className={`${styles.link}`}>
                  Выход
                </Link>
              </li>
            </ul>
          </nav>
          <p className={styles.description}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
        <form name="forgot-password" className={styles.form}>
          <Input
            autoFocus
            type="text"
            placeholder="Имя"
            onChange={setFormData}
            value={formValue.name}
            name="name"
            error={formValue.nameError}
            ref={nameRef}
            errorText="Введите в формате ..."
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('name')}
            disabled={formValue.nameDisabled}
            // onBlur={(e) => onBlur(e.target.name)}
          />
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
            icon="EditIcon"
            onIconClick={() => onIconClick('email')}
            disabled={formValue.emailDisabled}
            // onBlur={(e) => onBlur(e.target.name)}
          />
          <Input
            type="password"
            placeholder="Укажите пароль"
            onChange={setFormData}
            value={formValue.pass}
            name="pass"
            error={formValue.passError}
            ref={passRef}
            errorText="Только латиница и числа + символы"
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('pass')}
            disabled={formValue.passDisabled}
            // onBlur={(e) => onBlur(e.target.name)}
          />
        </form>
      </section>
    </main>
  );
};
