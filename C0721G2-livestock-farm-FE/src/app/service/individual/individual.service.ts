import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  public API = 'http://localhost:8080/api/individual/';

  constructor(private http: HttpClient) { }

  searchIndividual(page: number, sortField: string, sortDirection: string, individualId: string, cageId: string,
                   dateIn: string, dateOut: string, status: string) : Observable<any> {
    return this.http.get(this.API + 'list?page=' + page + '&sortField=' + sortField + '&sortDirection=' + sortDirection
    + '&individualId=' + individualId + '&cageId=' + cageId + '&dateIn=' +dateIn +'&dateOut=' + dateOut +'&status=' + status);
  }
}
