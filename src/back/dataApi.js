import * as data from './db.json';

let transactions = [
  {
    amount: '123123',
    comment: 'sadfas',
    currency: 'USD',
    destination: 'asdfas',
    id: 1,
    origin: '12345679',
    user_id: 1,
  },
];

let value = {
  "USD": {
    "USD": 1,
    "$U": 42.70,
    "EUR": 0.86
  },
  "EUR":{
    "EUR": 1,
    "USD": 1.17,
    "$U": 49.84
  },
  "$U":{
    "EUR": 0.020,
    "USD": 0.023,
    "$U": 1
  }
}


export const logIn = (username, password) => {
  const user = data.users.find((user) => {
    return user.password === password && user.username === username;
  });

  return user || null;
};

export const getAccounts = async (userId) => {
  const resp = await fetch("http://localhost:3001/bankAccounts");
  const bankAccounts = await resp.json();
  const accounts = bankAccounts.filter((account) => {
    return account.user_id === userId;
  });
  return accounts;
};

export const createTransaction = async (
  origin,
  destination,
  amount,
  currency,
  comment,

) => {
  const user_id = data.bankAccounts.find((account) => {
return account.number === origin;

  }).user_id;
const transaction = {
  origin,
  destination,
  amount,
  currency,
  comment,
  user_id,
};
await fetch('http://localhost:3001/transactions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(transaction),
});

return transaction;




};

export const getUserTransactions = async (user_id) => {
  const resp = await fetch("http://localhost:3001/transactions");
  const transactions = await resp.json();
  const userTransactoins = transactions.filter((transaction) => {
    return transaction.user_id === user_id;
  });
  return userTransactoins;
};

export const findAccount = async (account_number) => {
  const resp = await fetch("http://localhost:3001/bankAccounts");
  const bankAccounts = await resp.json();
  const account = bankAccounts.find((account) => {
    return account.number == account_number;
  });
  return account;
};

export const calculateAmount = async (origin_number, destination_number, amount) => {
  const origin_account = data.bankAccounts.find((account) => {
    return account.number == origin_number;
  });
  const destination_account = data.bankAccounts.find((account) => {
    return account.number == destination_number;
  });

let changedAmount = '0';

const resp = await fetch('http://localhost:3001/value');
const value = await resp.json();
changedAmount =
  value[origin_account.currency][destination_account.currency] *
  parseFloat(amount);

    return changedAmount;
};
