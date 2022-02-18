import {Employee} from '../employee/employee';
import {TypeOfCage} from './type-of-cage';

export interface Cage {
  id?: string;
  closeDate?: string;
  openDate?: string;
  quantity?: number;
  employee: Employee;
  typeOfCage: TypeOfCage;
}
