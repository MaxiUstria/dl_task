import {
  IAuthenticate,
  IBankAccounts,
  IUnauthenticate,
} from '../actions/current';
import { AUTHENTICATE, UNAUTHENTICATE, GET_BANK_ACCOUNTS } from '../constants';
import { ICurrent } from '../../types';
export default function currentReducer(
  state: ICurrent = {
    user: null,
    isAuthenticated: null,
    bankAccounts: [],
  },
  action: IAuthenticate | IUnauthenticate | IBankAccounts,
): ICurrent {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
      };
    case UNAUTHENTICATE:
      return { user: null, isAuthenticated: false, bankAccounts: [] };
    case GET_BANK_ACCOUNTS:
      return {
        ...state,
        bankAccounts: action.bankAccounts,
      };
  }
  return state;
}
