import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {
public API = 'http://localhost:8080/api/individual';
  constructor(private httpClient: HttpClient) { }

  findIndividualbyId(id: string): Observable<any>{
    return this.httpClient.get(this.API +'/id/' +id);
 }
  addIndividual(individual: any): Observable<any>{
    return this.httpClient.post(this.API +'/add/',individual);
 }
  editIndividual(individual: any): Observable<any>{
    return this.httpClient.patch(this.API +'/edit/',individual);
 }

}
