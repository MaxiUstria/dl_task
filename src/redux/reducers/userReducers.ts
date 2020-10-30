import { IAuthenticate, IUnauthenticate } from '../actions/userActions';
import { AUTHENTICATE, UNAUTHENTICATE } from '../constants';
import { ICurrent } from '../../types';
export default function currentReducer(
  state: ICurrent = {
    user: null,
    isAuthenticated: null,
  },
  action: IAuthenticate | IUnauthenticate,
): ICurrent {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { user: null, isAuthenticated: false };
  }
  return state;
}
