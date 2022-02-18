import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CageService {

  public API = 'http://localhost:8080/api/cage';

  constructor(private http: HttpClient) {
  }

  getCage(id: string): Observable<any> {
    return this.http.get(this.API + '/detail/' + id);
  }

  search(page: number, search: string): Observable<any> {
    return this.http.get(this.API + '/search?search' + search + '&page=' + page);
  }
}
