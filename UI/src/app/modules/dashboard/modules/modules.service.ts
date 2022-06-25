import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  isAddProjectTask = false;


  constructor(private http: HttpClient, private constantService:NavigationService,) { }

  GetBaseModule() {
    const url =environment.baseUrl + 'Module/GetBaseModules';
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
AddModuleData(requestObject: any): Observable<any> {
    return this.http
        .post<any>(environment.baseUrl + 'Module/AddModule', requestObject)
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
}

DeleteModuleData(item: any) {
    return this.http
        .post<any>(
            environment.baseUrl +
                'Module/DeleteModule?moduleId=' +
                item.moduleId,
            ''
        )
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
}

UpdateModuleData(updateUser: any): Observable<any> {
    return this.http
        .put<any>(environment.baseUrl + 'Module/UpdateModule', updateUser)
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
