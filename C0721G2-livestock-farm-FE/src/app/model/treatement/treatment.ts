import {Individual} from '../individual/individual';

export interface Treatment {
  id?: string;
  treatmentDate?: string;
  doctor?: string;
  medicine?: string;
  note?: string;
  kindOfDisease?: string;
  quantily?: string;
  individual: Individual;
}
