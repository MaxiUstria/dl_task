const users = [
  {
    id: 1,
    username: 'jdoe',
    password: 'password',
    name: 'John',
    surname: 'Doe',
  },
  {
    id: 2,
    username: 'limpsum',
    password: 'password',
    name: 'Lorem',
    surname: 'Ipsum',
  },
];

const bankAccounts = [
  { id: 1, number: '12345678', user_id: 1 },
  { id: 2, number: '12345679', user_id: 1 },
  { id: 3, number: '12345670', user_id: 1 },
  { id: 4, number: '12345671', user_id: 1 },
  { id: 5, number: '12345672', user_id: 1 },
];

const transactions = [];

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  users,
  bankAccounts,
  transactions,
};
