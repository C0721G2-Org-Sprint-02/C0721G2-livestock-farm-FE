import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TreatementService {
  public API = 'http://localhost:8080/api/treatement';

  constructor(private http: HttpClient) {
  }

  search(page: number, searchDoctor: string, searchKindOfDisease: string, searchCage: string): Observable<any> {
    if(searchDoctor===undefined) searchDoctor = '';
    if(searchKindOfDisease===undefined) searchKindOfDisease = '';
    if(searchCage===undefined) searchCage = '';
    // return this.http.get(this.API + '/list?'+'cage=' + searchCage + '&page=' + page);
    return this.http.get(this.API + '/list?doctor=' + searchDoctor + '&kindOfDisease=' + searchKindOfDisease + '&cage=' + searchCage + '&page=' + page);
  }

  save(treatement: any): Observable<any> {
    console.log('send to be');
    return this.http.post(this.API + '/post', treatement);
  }
}
