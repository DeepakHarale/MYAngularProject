import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesStorageService {

  constructor(private http: HttpClient) { }

  GetStorageAccessoriesDetails() {
    const url = environment.baseUrl +'AccessoriesStorage/GetAccessoriesStorage';
    return this.http.get<any[]>(url);
}


postData(requestObject: any): Observable<any> {
  return this.http
      .post<any>(environment.baseUrl +'AccessoriesStorage/AddAccessoriesStorage', requestObject)
      .pipe(
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
      .post<any>(environment.baseUrl + 'AccessoriesStorage/UpdateAccessoriesStorage', updateUser)
      .pipe(
          map(response => {
              return response;
          }),
          catchError(error => {
              return throwError(error);
          })
      );
}

DeleteData(apiName: string, requestObject: any): Observable<any> {
    // const httpOptions = this.getHeaders();s
    return this.http.post<any>(environment.baseUrl + apiName, requestObject)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }


}
