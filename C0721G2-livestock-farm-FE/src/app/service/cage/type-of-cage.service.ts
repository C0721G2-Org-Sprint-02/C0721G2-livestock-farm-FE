import {Injectable} from '@angular/core';
import {TypeOfCage} from '../../model/cage/type-of-cage';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeOfCageService {
  public API = 'http://localhost:8080/api/cages/typeOfCage';

  constructor(private httpClient: HttpClient) {
  }

  getTypeOfCage(): Observable<TypeOfCage[]> {
    return this.httpClient.get<TypeOfCage[]>(this.API);
  }
}
