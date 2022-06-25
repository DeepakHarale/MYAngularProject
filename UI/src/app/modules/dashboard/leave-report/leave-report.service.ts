import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Observable, throwError } from 'rxjs';
import { catchError ,map} from 'rxjs/operators';
import { GetLeave } from './leave-report-interface';

@Injectable({
  providedIn: 'root'
})
export class LeaveReportService {

  constructor(private http:HttpClient) { }

  getData(): Observable<any> {
   // const httpOptions = this.getHeaders();
   // apiName = apiName;
    return this.http.get<GetLeave[]>(environment.baseUrl +'Leave/GetAllLeave' )
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
