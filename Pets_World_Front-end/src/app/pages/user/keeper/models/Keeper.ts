export interface Keeper {
  _id: string;
  cost: number;
  description: string;
  experience: number;
  licence: string;
  numberOfReviews: number;
  totalOfReviews: number;
  owner_id: UserDetails;
}

export interface UserDetails{
  email: string;
  firstName: string;
  gender: string;
  image: string;
  lastName: string;
  phone: string;
  role: string;
}
