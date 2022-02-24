import {AppUser} from '../user/app-user';

export interface EmployeeDTO {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  idCard: string;
  gender: number;
  roleDTO: number;
  appUser: AppUser;
  username: string;
  image: string;
}
