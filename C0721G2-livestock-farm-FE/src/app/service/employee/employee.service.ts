import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EmployeeDTO} from '../../model/employee/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = 'http://localhost:8080/api/employee/';

  constructor(private http: HttpClient) {
  }

  getEmployeeList(page: number, sort: number, role: number, search: string): Observable<any> {
    return this.http.get(this.API_URL + 'list' + '?page=' + page + '&sort=' + sort + '&role=' + role + '&search=' + search);
  }

  deleteEmployee(employeeId): Observable<any> {
    return this.http.delete(this.API_URL + 'delete/' + employeeId);
  }

  save(employee: any): Observable<any> {
    return this.http.post(this.API_URL + 'create/', employee);
  }

  editEmployee(employee: any): Observable<any> {
    return this.http.patch(this.API_URL + 'edit/', employee);
  }

  createEmployeeDTO(employee: EmployeeDTO): Observable<EmployeeDTO> {
    // @ts-ignore
    return this.http.post<EmployeeDTO>(this.API + 'create/', JSON.stringify(employee), this.httpOptions)
  }

  findEmployeeById(id: string): Observable<any> {
    return this.http.get(this.API_URL + 'edit/' + id);
  }
}
