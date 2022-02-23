import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee/employee';
import {EmployeeDTO} from '../../model/employee/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public API = 'http://localhost:8080/api/employee';

  constructor(private http: HttpClient) { }

  save(employee: any): Observable<any> {
    return this.http.post(this.API + '/create/', employee);
  }

  findEmployeeById(id: string): Observable<any> {
    return this.http.get(this.API + '/edit/' + id);
  }

  updateEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.patch(this.API + '/edit/' + id, employee);
  }

  createEmployeeDTO(employee: EmployeeDTO): Observable<EmployeeDTO> {
    // @ts-ignore
    return this.http.post<EmployeeDTO>(this.API + '/create/', JSON.stringify(employee), this.httpOptions)
  }
}
