export interface ICurrent {
  isAuthenticated: boolean | null;
  user: User | null;
  bankAccounts?: [BankAccount] | [];
}

export type User = {
  id: number;
  username: string;
  password: string;
  name: string;
  surname: string;
};


export type BankAccount = {
  id: number;
  number: string;
  user_id: number;
};
