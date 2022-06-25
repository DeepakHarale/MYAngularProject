import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NavigationService } from '@app/modules/navigation/services';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  

  constructor(private http : HttpClient , private constantService: NavigationService) { }

  postData(apiName: string, requestObject: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post<any>(environment.baseUrl + apiName, requestObject);
  
  }
  
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

  getProjectData(apiName: string): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName,httpOptions);
     
  }
  getAllProject(apiName: string): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName,httpOptions);
     
  }

  getTaskData(apiName: string): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName,httpOptions);
     
  }

  deleteRow(apiName: string ,id :number){
    const httpOptions = this.getHeaders();
    return this.http.get(environment.baseUrl + apiName+id , httpOptions);
  }

  getTimesheet(apiName: string , weekId :any , employeeId: any ): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName, {
      params: {
        weekno: weekId,
        emploeeId: employeeId
      }
    });
     
  }

   /** PUT: update data on the server */
   updateData(apiName: string, weekId: any): Observable<any> {
   
    const httpOptions = this.getHeaders();
    return this.http.get(environment.baseUrl + apiName+weekId);
     
  }


  

}
