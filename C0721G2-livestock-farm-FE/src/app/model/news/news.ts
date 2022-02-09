import {TypeOfNews} from './type-of-news';
import {Employee} from '../employee/employee';

export interface News {
  id?: string;
  title?: string;
  content?: string;
  postDate?: string;
  image: string;
  typeOfNews: TypeOfNews;
  employee: Employee;
}
