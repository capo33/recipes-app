export interface User {
  message: string;
  token: string;
  name: string;
  email: string;
  password: string;
  answer?: string;
  about?: string;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
  _id?: string;
  avatar?: string;
}

 
export interface AuthUser {
  email: string;
  password: string;
  name?: string;
}

export interface Auth {
  formData: AuthUser;
  navigate: any;
  toast?: any;
}
