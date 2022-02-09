import {Cages} from '../cage/cages';

export interface Individual {
  id?: string;
  dateIn?: string;
  dateOut?: string;
  weight?: number;
  status?: string;
  cage: Cages;
}
