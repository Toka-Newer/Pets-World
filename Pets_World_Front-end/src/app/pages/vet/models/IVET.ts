export interface IVET{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  image: string;
  experience: number;
  cost: number;
  description: string;
  user_id: User;
}

export interface User{
  firstName: string;
  lastName: string;
}
