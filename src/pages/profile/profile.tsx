import { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { getUserDataSelector } from '../../services/selectors';
import { setUserDataAction } from '../../services/actions/user/set-user';
import { useForm } from '../../hooks/useForm';
import { IBodyRequest } from '../../utils/types';

export const Profile: FC = () => {
  const dispatch = useDispatch<any>();
  const { name, email } = useSelector(getUserDataSelector);

  const { formValues, handleChange, setFormValues } = useForm({
    name,
    nameError: false,
    nameDisabled: true,
    email,
    emailError: false,
    emailDisabled: true,
    pass: '',
    passError: false,
    passDisabled: true,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const onIconClick = (string: string) => {
    const key = `${string}Disabled`;
    if (key === 'nameDisabled' || key === 'emailDisabled' || key === 'passDisabled') {
      setFormValues({
        ...formValues,
        nameDisabled: true,
        emailDisabled: true,
        passDisabled: true,
        [key]: !formValues[key],
      });
    }
  };

  useEffect(() => {
    if (nameRef.current && emailRef.current && passRef.current) {
      if (!formValues.nameDisabled) {
        nameRef.current.focus();
      } else if (!formValues.emailDisabled) {
        emailRef.current.focus();
      } else if (!formValues.passDisabled) {
        passRef.current.focus();
      }
    }
  }, [formValues.nameDisabled, formValues.emailDisabled, formValues.passDisabled]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bodyRequest: IBodyRequest = {};
    if (formValues.name !== name && formValues.name !== '') bodyRequest.name = formValues.name;
    if (formValues.email !== email && formValues.email !== '') bodyRequest.email = formValues.email;
    if (formValues.pass !== '') bodyRequest.password = formValues.pass;
    dispatch(setUserDataAction(bodyRequest));
    setFormValues({
      ...formValues,
      nameDisabled: true,
      emailDisabled: true,
      passDisabled: true,
    });

  };

  const onReset = () => {
    setFormValues({
      ...formValues,
      name,
      email,
      pass: '',
    });
  };

  const showButtons = name !== formValues.name || email !== formValues.email || formValues.pass;

  return (
    <main>
      <section className={styles.wrapper}>
        <ProfileMenu />
        <form name="edit-user" className={styles.form} onSubmit={onSubmit}>
          <Input
            autoFocus
            type="text"
            placeholder="Имя"
            onChange={handleChange}
            value={formValues.name || ''}
            name="name"
            error={formValues.nameError}
            ref={nameRef}
            errorText="Введите в формате ..."
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('name')}
            disabled={formValues.nameDisabled}
          />
          <Input
            type="email"
            placeholder="Логин"
            onChange={handleChange}
            value={formValues.email}
            name="email"
            error={formValues.emailError}
            ref={emailRef}
            errorText="Введите в формате example@ya.ru"
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('email')}
            disabled={formValues.emailDisabled}
          />
          <Input
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={formValues.pass}
            name="pass"
            error={formValues.passError}
            ref={passRef}
            errorText="Только латиница и числа + символы"
            size="default"
            extraClass="mb-6"
            icon="EditIcon"
            onIconClick={() => onIconClick('pass')}
            disabled={formValues.passDisabled}
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
