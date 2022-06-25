import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetDetailsService {

  constructor(private http : HttpClient , private constantService: NavigationService) { }

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

  getData(id : number): Observable<any> {
    const httpOptions = this.getHeaders();
  
    return this.http.get(environment.baseUrl +"WeeklyTimeSheet/GetEmployeeID/"+id,httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
