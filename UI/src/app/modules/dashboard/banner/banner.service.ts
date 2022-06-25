import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http:HttpClient) { }

   
   getData() {
    const url = environment.baseUrl + 'InterviewDetails/GetInterviewDetails';
    return this.http.get<any[]>(url);
} 

   postData(requestObject: any): Observable<any> {
    return this.http
        .post<any>(environment.baseUrl + 'InterviewDetails/AddInterviewDetails', requestObject)
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
}
DeleteBannerDetails(item: any) {
  return this.http.post<any>(environment.baseUrl + 'InterviewDetails/DeleteHolidayDetails', item).pipe(
      map(response => {
          return response;
      }),
      catchError(error => {
          return throwError(error);
      })
  );
}

UpdateData(updateUser: any): Observable<any> {
  return this.http
      .post<any>(environment.baseUrl + 'InterviewDetails/UpdateInterviewDetail', updateUser)
      .pipe(
          map(response => {
              return response;
          }),
          catchError(error => {
              return throwError(error);
          })
      );
}
}
