import { users, bankAccounts, transactions } from './mockData';






export const logIn = (username, password) => {
  const user = users.find((user) => {
    return user.password === password && user.username === username;
  });

  return user || null;
};

export const getAccounts = (userId) => {
  const accounts = bankAccounts.filter((account) => {
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
  const transaction = { id: 1, origin, destination, amount, currency, comment };
  if (transactions.length !== 0) {
    const max = transactions.reduce(function (prev, current) {
      return prev.id > current.id ? prev : current;
    });
    transaction.id = max.id + 1;
  }
  return transaction;
};
