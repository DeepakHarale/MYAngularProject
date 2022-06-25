import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient, private constantService: NavigationService) { 
  }

  GetRoleDetails() {
    const url = environment.baseUrl + 'Role/GetRoles';

    return this.http.get<any[]>(url);
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
      .post<any>(environment.baseUrl + 'Role/Addrole', requestObject)   
      .pipe(
          map(response => {
              return response;
          }),
          catchError(error => {
              return throwError(error);
          })
      );
}

DeleteRole(item: any) {
  return this.http.post<any>(environment.baseUrl + 'Role/DeleteRole', item).pipe(   
      map(response => {
          return response;
      }),
      catchError(error => {
          return throwError(error);
      })
  );
}

UpdateRole(upRole: any): Observable<any> {
  return this.http
      .put<any>(environment.baseUrl + 'Role/UpdateRole', upRole)
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
