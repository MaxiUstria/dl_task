import * as constants from '../constants';
import { User, BankAccount, Transaction } from '../../types';
import { logIn, getAccounts, createTransaction } from '../../back/dataApi';

export interface IAuthenticate {
  type: constants.AUTHENTICATE;
  user: User;
}
export function authenticate(
  username: string,
  password: string,
): IAuthenticate | IUnauthenticate {
  const user: any = logIn(username, password);
  if (user) {
    return {
      type: constants.AUTHENTICATE,
      user: user,
    };
  }
  return {
    type: constants.UNAUTHENTICATE,
  };
}
export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}
export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}
export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export interface IBankAccounts {
  type: constants.GET_BANK_ACCOUNTS;
  bankAccounts: [BankAccount];
}

export function getBankAccounts(userId: number): IBankAccounts {
  const bankAccounts: any = getAccounts(userId);
  return {
    type: constants.GET_BANK_ACCOUNTS,
    bankAccounts,
  };
}

export interface ITransaction {
  type: constants.CREATE_TRANSACTION;
  transaction: Transaction;
}

export function postTransaction(
  origin: string,
  destination: string,
  amount: string,
  currency: string,
  comment: string,
): ITransaction {
  const transaction: any = createTransaction(
    origin,
    destination,
    amount,
    currency,
    comment,
  );
  return {
    type: constants.CREATE_TRANSACTION,
    transaction,
  };
}