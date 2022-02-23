import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = 'http://localhost:8080/api/employee/';

  constructor(private http: HttpClient) { }

  getEmployeeList(page: number, sort: number, role: number, search: string): Observable<any> {
    return this.http.get(this.API_URL + 'list' + '?page=' + page + '&sort=' + sort + '&role=' + role + '&search=' + search );
  }

  deleteEmployee(employeeId): Observable<any> {
    return this.http.delete(this.API_URL + 'delete/' + employeeId);
  }
}
