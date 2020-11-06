import * as data from './db.json';

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
  exchangeInfo,
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
  exchangeInfo,
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
let exchangeInfo = '';

  const origin_account = data.bankAccounts.find((account) => {
    return account.number == origin_number;
  });
  const destination_account = data.bankAccounts.find((account) => {
    return account.number == destination_number;
  });

let changedAmount = '0';

const resp = await fetch('http://localhost:3001/value');
const value = await resp.json();
exchangeInfo =
  origin_account.currency +
  '-' +
  destination_account.currency +
  '/' +
  value[origin_account.currency][destination_account.currency].toString();

changedAmount =
  value[origin_account.currency][destination_account.currency] *
  parseFloat(amount);

return [changedAmount, exchangeInfo];

};

export const getUser = async (nickname) => {
  const resp = await fetch('http://localhost:3001/users');
  const users = await resp.json();

  const user = users.find((user) => {
    return user.username === nickname;
  });

  return user;
};

export const updateUserPassword = async (user, password) => {
  user.password = password;
  fetch(`http://localhost:3001/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
};

export const deleteBankAccount = async (user, accountId) => {
  const resp = await fetch(`http://localhost:3001/bankAccounts/${accountId}`);
  const account = await resp.json();
  if (account.user_id == user.id) {
    fetch(`http://localhost:3001/bankAccounts/${accountId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    });
  }
};
