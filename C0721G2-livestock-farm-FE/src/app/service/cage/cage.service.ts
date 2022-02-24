import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// @ts-ignore
import {Cage} from '../model/cage';

@Injectable({
  providedIn: 'root'
})
export class CageService {
  public API = 'http://localhost:8080/api/cages';

  constructor(public httpClient: HttpClient) {
  }

  public saveCage(cage: any): Observable<any> {
    return this.httpClient.post(this.API + '/create', cage);
  }

  public updateCage(id: string, cage: Cage): Observable<any> {
    return this.httpClient.patch(this.API + '/edit/' + id , cage);
  }

  public findCageById(id: string): Observable<any> {
    return this.httpClient.get(this.API + '/' + id);
  }
  getListCage(): Observable<any> {
    return this.httpClient.get(this.API + '/listCage');
  }

  search(page: number, search: string): Observable<any> {
    return this.httpClient.get(this.API + '/search?search=' + search + '&page=' + page);
  }
}
