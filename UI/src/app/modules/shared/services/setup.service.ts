import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  userInfo: any;

  constructor(private http: HttpClient, private constantService: NavigationService) {

  }

  getRole() {

    let url = environment.baseUrl + 'User/GetRoles';


    return this.http.get(url);

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
  /** GET: get data from the server */
  getData(apiName: string): Observable<any> {
    const httpOptions = this.getHeaders();
    apiName = apiName;
    return this.http.get(environment.baseUrl + apiName, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  /** PUT: update data on the server */
  updateData(apiName: string, reqestObj: any): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.put(environment.baseUrl + apiName, reqestObj)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  UpdateDoc(updateUser: any): Observable<any> {
    return this.http
      //  .put<any>("assimilatetech-001-site1.btempurl.com/api/Employee/UpdateDocumentDetail",updateUser)
      .post<any>(environment.baseUrl + 'Employee/UpdateDocumentDetail', updateUser)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /** POST: send data to the server */
  postData(apiName: string, requestObject: any): Observable<any> {
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
  /** POST: send data to the server */
  postLoginData(apiName: string, requestObject: any): Observable<any> {
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
  /** DELETE: send data to the server */
  deleteData(apiName: string): Observable<any> {
    const httpOptions = this.getHeaders();
    return this.http.delete<any>(environment.baseUrl + apiName, httpOptions)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );

  }

  /** POST: send files data   to the server */
  postDataUpload(apiName: string, requestObject: any): Observable<any> {
    // const headers_object = new HttpHeaders().set('Authorization', 'Bearer ' + this.userInfo.token);
    return this.http.post<any>(environment.baseUrl + apiName, requestObject, {
      //   headers: headers_object,
      reportProgress: true,
      observe: 'events'
    })
      .pipe(map(response => {
        return response;
      }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }

  getEmployeeByJoiningDate(cDate: any, toDate: any) {
    const params = {
      fromDate: cDate,
      toDate: toDate
    }
    let url = 'Employee/GetNewlyJoinEmployee/NewlyJoinEmployee'

    return this.http.get(environment.baseUrl + url, { params })

  }

}
