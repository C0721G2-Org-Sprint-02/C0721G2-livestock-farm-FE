import {Individual} from '../individual/individual';

export interface Treatment {
  id?: string;
  treatementDate?: string;
  doctor?: string;
  medicine?: string;
  note?: string;
  kindOfDisease?: string;
  quantily?: string;
  individual: Individual;
}
