import {
  IAuthenticate,
  IBankAccounts,
  ITransaction,
  IUnauthenticate,
} from '../actions/current';
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  GET_BANK_ACCOUNTS,
  CREATE_TRANSACTION,
} from '../constants';
import { ICurrent } from '../../types';
export default function currentReducer(
  state: ICurrent = {
    user: null,
    isAuthenticated: null,
    bankAccounts: [],
    transaction: null,
  },
  action: IAuthenticate | IUnauthenticate | IBankAccounts | ITransaction,
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
    case CREATE_TRANSACTION:
      return {
        ...state,
        transaction: action.transaction,
      };
  }
  return state;
}
