import * as data from './mockData.json';

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


export const logIn = (username, password) => {
  const user = data.users.find((user) => {
    return user.password === password && user.username === username;
  });

  return user || null;
};

export const getAccounts = (userId) => {
  const accounts = data.bankAccounts.filter((account) => {
    return account.user_id === userId;
  });
  return accounts;
};

export const createTransaction = (
  origin,
  destination,
  amount,
  currency,
  comment,

) => {
  const user_id = data.bankAccounts.find((account) => {
return account.number === origin;

  }).user_id;
  const transaction = { id: 1, origin, destination, amount, currency, comment, user_id };
  if (transactions.length !== 0) {
    const max = transactions.reduce(function (prev, current) {
      return prev.id > current.id ? prev : current;
    });

    transaction.id = max.id + 1;
  }
transactions.push(transaction);


  return transaction;
};

export const getUserTransactions = (user_id) => {
  const userTransactoins = transactions.filter((transaction) => {
    return transaction.user_id === user_id;
  });
  return userTransactoins;
};
