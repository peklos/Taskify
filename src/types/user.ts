export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
}

export type NewUser = Omit<User, "id">;
