import { TGetUserDataActions } from './get-user';
import { TLoginActions } from './login';
import { TLogoutActions } from './logout';
import { TRegisterActions } from './register';
import { TSetUserDataActions } from './set-user';
import { TUpdateTokenActions } from './update-token';

export type TUserActions =
  | TGetUserDataActions
  | TLoginActions
  | TLogoutActions
  | TRegisterActions
  | TSetUserDataActions
  | TUpdateTokenActions;
