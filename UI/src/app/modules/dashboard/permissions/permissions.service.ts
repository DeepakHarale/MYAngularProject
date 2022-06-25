import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private http: HttpClient, private constantService:NavigationService) { }


 getModuleDetails(roleId:any){
   let url= environment.baseUrl + 'Permission/GetAllModulePermision/'+roleId;
   return this.http.get(url);
 } 

GetPermissionDetails() {
  const url = environment.baseUrl + 'Permission/GetRolePermisions';
  return this.http.get(url);
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


AddPermission(roleId:number,requestObject: any): Observable<any> {
  const httpOptions = this.getHeaders();
  return this.http.post<any>(environment.baseUrl + 'Permission/AddModulePermissions/'+roleId, requestObject).pipe(
      map(response => {
          return response;
      }),
      catchError(error => {
          return throwError(error);
      })
  );
}

getAllPermissionById(id: any) {
  return this.http.get<any>(environment.baseUrl + '/Permission/GetRolePermisions/' +id).pipe(
      map(response => {
          return response;
      }),
      catchError(error => {
          return throwError(error);
      })
  );
}

DeletePermissionDetails() {
  const url = environment.baseUrl + 'Permission/DeletePermission';
  return this.http.delete(url);
}

UpdateData(updateUser: any): Observable<any> {
  return this.http
      .put<any>(environment.baseUrl + 'Permission/UpdatePermission', updateUser)
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
