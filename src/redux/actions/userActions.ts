import * as constants from '../constants';
import { User } from '../../types';
import { Dispatch } from 'redux';

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  user: User;
}
export function logIn(user: any): IAuthenticate {
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
          dispatch(logIn(user));
        }
      });
  };
}

export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}
export type AuthenticationAction = IAuthenticate | IUnauthenticate;