import {
  IAuthenticate,
  IBankAccounts,
  ITransaction,
  IUnauthenticate,
  ITransactions,
} from '../actions/current';
import {
  AUTHENTICATE,
  UNAUTHENTICATE,
  GET_BANK_ACCOUNTS,
  CREATE_TRANSACTION,
  GET_TRANSACTIONS,
} from '../constants';
import { ICurrent } from '../../types';
export default function currentReducer(
  state: ICurrent = {
    user: null,
    isAuthenticated: null,
    bankAccounts: [],
    transaction: null,
    transactions: [],
  },
  action:
    | IAuthenticate
    | IUnauthenticate
    | IBankAccounts
    | ITransaction
    | ITransactions,
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
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions,
      };
  }
  return state;
}
