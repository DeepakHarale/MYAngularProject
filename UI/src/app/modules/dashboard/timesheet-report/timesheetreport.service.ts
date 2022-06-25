import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetreportService {

  constructor(private http:HttpClient) { }

  getData(id : number): Observable<any> {
   // const httpOptions = this.getHeaders();
  
    return this.http.get(environment.baseUrl +"WeeklyTimeSheet/GetEmployeeID/"+id)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  getTaskData(apiName: string): Observable<any> {
   // const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName);
     
  }
  getProjectTask(apiName: string, id: number): Observable<any> {
   // const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName + id);
  }

}
