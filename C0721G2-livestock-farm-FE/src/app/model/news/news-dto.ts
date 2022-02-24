import {TypeOfNews} from './type-of-news';
import {Employee} from '../employee/employee';

export interface NewsDTO {
  id: string;
  title: string;
  content: string;
  postDate: string;
  image: string;
  typeOfNewsDTO: TypeOfNews;
  employee: Employee;
}
