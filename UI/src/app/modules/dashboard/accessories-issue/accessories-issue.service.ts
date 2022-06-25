import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { ConfirmationService } from 'primeng/api';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesIssueService {

  constructor(private http:HttpClient,private constantService: NavigationService) { }

  GetApproval() {
    const url = environment.baseUrl + 'AccessoriesStorage/GetAccessories';
    return this.http.get<any[]>(url);
}

getCount(apiName: string, requestObject: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.post<any>(environment.baseUrl + apiName, requestObject)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }


getHeaders() {
  const token = this.constantService.getToken();
  return {
      headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token ? token : '',
      }),
  };
}

postData(requestObject: any): Observable<any> {
    return this.http
        .post<any>(environment.baseUrl + 'AccessoriesStorage/AddAccessories', requestObject)
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


UpdateData(updateUser: any): Observable<any> {
    return this.http
        .post<any>(environment.baseUrl + 'AccessoriesStorage/UpdateAccessories', updateUser)
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
