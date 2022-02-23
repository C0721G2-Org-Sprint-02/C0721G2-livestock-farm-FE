import {Cage} from '../cage/cage';

export interface Individual {
  id?: string;
  dateIn?: string;
  dateOut?: string;
  weight?: number;
  status?: string;
  cage: Cage;
}
