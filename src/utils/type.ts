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

export interface InfoBook {
  id: string;
  fileRef: string;
  fileUrl: string;
  imageUrl: string;
  imageRef: string;
  title: string;
  category: string;
}

export interface UserInfo {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Context {
  loading: boolean;
  error: string;
  resetError: () => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
}
