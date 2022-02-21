import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CageService {
  public API = 'http://localhost:8080/api/cage';
  constructor(private http: HttpClient) { }

  getListCage(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
}
