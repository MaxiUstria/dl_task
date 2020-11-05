import * as constants from '../constants';
import { User } from '../../types';
import { Dispatch } from 'redux';

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  user: User;
}
export function logIn(user: User): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
    user: user,
  };
}
export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}

export function authenticate(username: string, password: string) {

  return function (dispatch: Dispatch) {

    return fetch(`http://localhost:3001/users`)
      .then(
        (response) => response.json(),
      )
      .then((users) => {
        const user = users.find((user: any) => {
          return user.password === password && user.username === username;
        });
        
        if (user){
          dispatch(logIn(user as User));
        }
      });
  };
}

export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export interface IUpdateUser {
  type: constants.UPDATE_USER;
  user: User;
}

export function fetchUser(user: User): IUpdateUser {
  return {
    type: constants.UPDATE_USER,
    user: user,
  };
}

export function updateUser(
  user: User,
  name: string,
  surname: string,
  username: string,
) {
  user.name = name;
  user.surname = surname;
  user.username = username;
  return function (dispatch: Dispatch) {
    return fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => {
      response.json().then((newUser) => {
        dispatch(fetchUser(newUser as User));
      });
    });
  };
}

export type AuthenticationAction =
  | IAuthenticate
  | IUnauthenticate
  | IUpdateUser;