type User = {
  _id: string;
  email: string;
  password: string;
};

type UserDetails = Omit<User, "password">;

export type { User, UserDetails };
