export interface Data {
  [index: string]: string | FileList | number;
}

export interface IBook {
  [index: string]: string | FileList;
}

export interface User {
  uid: string;
}

export interface InfoBook {
  id: string;
  fileRef: string;
  fileUrl: string;
  imageUrl: string;
  imageRef: string;
  title: string;
  favorite: boolean;
  trash: boolean;
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
  user: User | null;
  resetError: () => void;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  logOut: () => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
}

export interface IBookContext {
  data: InfoBook[];
  selectCat: (category: string, type: string) => void;
  search: (keyword: string) => void;
  loading: boolean;
  isEmpty: boolean;
  hasNoBooks: boolean;
  moveToTrash: (docId: string) => Promise<void>;
  addToFavorite: (docId: string) => Promise<void>;
  removeFromFavorite: (docId: string) => Promise<void>;
  restoreBook: (docId: string) => Promise<void>;
  deleteBook: (doc: InfoBook) => Promise<void>;
}
