export interface Data {
  [index: string]: string | FileList | number;
}

export interface IBook {
  [index: string]: string | FileList;
}

export interface User {
  uid: string;
  name: string;
}

export interface UserInfo {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Context {
  user: User | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  logOut: () => void;
}
