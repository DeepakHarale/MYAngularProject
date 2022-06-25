import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskDetailsService {

  constructor(private http: HttpClient, private constantService: NavigationService) { }

  getHeaders() {
    const token = this.constantService.getToken();
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token ? token : ''
      })
    };
  }

  getProjectTask(apiName: string, id: number): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName + id, httpOptions);
  }

  postDataEmployee(apiName: string, object: any) {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.post(environment.baseUrl + apiName, object);
  }

  updateData(apiName: string, object: any) {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.put(environment.baseUrl + apiName, object);
  }

  getEmployeeProject(id: any) {
    const employeesUrl = environment.baseUrl + 'Employee/GetEmployee';
    const employeesByProjectUrl = environment.baseUrl + 'AssignProject/GetAllEmployeeByProject/' + id;
    return forkJoin([this.http.get(employeesByProjectUrl), this.http.get(employeesUrl)]);
  }
}
