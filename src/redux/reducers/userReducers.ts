import {
  IAuthenticate,
  IUnauthenticate,
  IUpdateUser,
} from '../actions/userActions';
import { AUTHENTICATE, UNAUTHENTICATE, UPDATE_USER } from '../constants';
import { ICurrent } from '../../types';
export default function currentReducer(
  state: ICurrent = {
    user: null,
    isAuthenticated: null,
  },
  action: IAuthenticate | IUnauthenticate | IUpdateUser,
): ICurrent {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.user,
      };
    case UNAUTHENTICATE:
      return { user: null, isAuthenticated: false };
  }
  return state;
}
