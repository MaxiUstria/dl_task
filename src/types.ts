export interface ICurrent {
  isAuthenticated: boolean | null;
  user: User | null;
}

export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
};
