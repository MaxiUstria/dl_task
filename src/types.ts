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
};

export type Transaction = {
  id: number;
  origin: string;
  destination: string;
  amount: number;
  currency: string;
  comment: string;
};
