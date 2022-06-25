import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class GenerateDocumentService {
    constructor(private http: HttpClient, private constantService: NavigationService) { }

    GetOfficialDocument() {
        const url = environment.baseUrl + 'OfficialDocument/GetOfficialDocument';
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
            .post<any>(environment.baseUrl + 'OfficialDocument/AddOfficialDocument', requestObject)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    DeleteHighlightsDetails(item: any) {
        return this.http.post<any>(environment.baseUrl + 'OfficialDocument/DeleteOfficialDocument', item).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }


    deletedata(apiName: string, requestObject: any): Observable<any> {
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

    UpdateData(updateUser: any): Observable<any> {
        return this.http
            .post<any>(environment.baseUrl + 'OfficialDocument/UpdateOfficialDocument', updateUser)
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
