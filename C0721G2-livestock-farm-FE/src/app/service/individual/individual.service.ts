import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Individual} from '../../model/individual/individual';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
  public API = 'http://localhost:8080/api/individual/';

  constructor(private http: HttpClient) {
  }

  searchIndividual(page: number, sortField: string, sortDirection: string, individualId: string, cageId: string,
                   dateIn: string, dateOut: string, status: string): Observable<any> {
    return this.http.get(this.API + 'list?page=' + page + '&sortField=' + sortField + '&sortDirection=' + sortDirection
      + '&individualId=' + individualId + '&cageId=' + cageId + '&dateIn=' + dateIn + '&dateOut=' + dateOut + '&status=' + status);
  }

  getIndividualById(id: string): Observable<any> {
    return this.http.get(this.API + 'detail/' + id);
  }

  deleteIndividual(individual: any): Observable<any> {
    return this.http.delete(this.API + 'delete/' + individual.id);
  }

  findIndividualbyId(id: string): Observable<any> {
    return this.http.get(this.API + 'id/' + id);
  }

  addIndividual(individual: any): Observable<any> {
    return this.http.post(this.API + 'add/', individual);
  }

  editIndividual(individual: any): Observable<any> {
    return this.http.patch(this.API + 'edit/', individual);
  }
}
