import {AppUser} from '../security/app-user';

export interface Employee {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  idCard: string;
  gender: number;
  image: string;
  appUser: AppUser;
}
