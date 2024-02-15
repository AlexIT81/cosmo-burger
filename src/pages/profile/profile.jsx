import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { getUserDataSelector } from '../../services/selectors';
import { setUserDataAction } from '../../services/actions/user/set-user';

export const Profile = () => {
  const dispatch = useDispatch();
  const { name, email } = useSelector(getUserDataSelector);

  const [formValue, setFormValue] = useState({
    name: '',
    nameError: false,
    nameDisabled: true,
    email: '',
    emailError: false,
    emailDisabled: true,
    pass: '',
    passError: false,
    passDisabled: true,
  });

  useEffect(() => {
    if (name && email) {
      setFormValue({
        ...formValue,
        name,
        email,
      });
    }
  }, [name, email]);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const bodyRequest = {};
    if (formValue.name !== name && formValue.name !== '') bodyRequest.name = formValue.name;
    if (formValue.email !== email && formValue.email !== '') bodyRequest.email = formValue.email;
    if (formValue.pass !== '') bodyRequest.password = formValue.pass;
    dispatch(setUserDataAction(bodyRequest));
    setFormValue({
      ...formValue,
      nameDisabled: true,
      emailDisabled: true,
      passDisabled: true,
    });

  };

  const onReset = () => {
    setFormValue({
      ...formValue,
      name,
      email,
      pass: '',
    });
  };

  const showButtons = name !== formValue.name || email !== formValue.email || formValue.pass;

  return (
    <main>
      <section className={styles.wrapper}>
        <ProfileMenu />
        <form name="edit-user" className={styles.form} onSubmit={onSubmit}>
          <Input
            autoFocus
            type="text"
            placeholder="Имя"
            onChange={setFormData}
            value={formValue.name || ''}
            name="name"
            error={formValue.nameError}
            ref={nameRef}
            errorText="Введите в формате ..."
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('name')}
            disabled={formValue.nameDisabled}
          />
          <Input
            type="email"
            placeholder="Логин"
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
          />
          <Input
            type="password"
            placeholder="Пароль"
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
          />
          {showButtons && (
            <div className={styles['buttons-wrapper']}>
              <Button htmlType="button" type="secondary" size="large" onClick={onReset}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="large">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};
