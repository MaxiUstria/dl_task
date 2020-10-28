import { users, bankAccounts } from './mockData';

export const logIn = (username, password) => {
  const user = users.find((user) => {
    return user.password === password && user.username === username;
  });

  return user || null;
};
