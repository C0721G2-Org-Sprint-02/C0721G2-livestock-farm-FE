import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeOfNews} from '../../model/news/type-of-news';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeOfServerService {
  private API_URL = 'http://localhost:8080/api/news/typeofnews';

  constructor(private httpClient: HttpClient) {
  }
  getAllType(): Observable<TypeOfNews[]> {
    return this.httpClient.get<TypeOfNews[]>(this.API_URL);
  }
}
