import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  public API = 'http://localhost:8080/api/buy_individual';

  constructor(private http: HttpClient) {
  }

  save(buyIndividual: any): Observable<any> {
    return this.http.post(this.API + '/create/', buyIndividual);
  }
}
