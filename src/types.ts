export interface ICurrent {
  isAuthenticated: boolean | null;
  user: User | null;
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
  currency: string;
};

export type BankAccounts = BankAccount[];

export type Transaction = {
  id?: number;
  origin: string;
  destination: string;
  amount: number;
  currency: string;
  comment: string;
};

export type Errors = {
  destination: string;
  origin: string;
  amount: string;
};

export type Transactions = Transaction[];
