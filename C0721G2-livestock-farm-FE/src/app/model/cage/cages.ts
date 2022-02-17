import {Employee} from '../employee/employee';
import {TypeOfCage} from './type-of-cage';

export interface Cages {
  id?: string;
  closeDate?: string;
  openDate?: string;
  quantily?: number;
  employee: Employee;
  typeOfCage: TypeOfCage;
}
