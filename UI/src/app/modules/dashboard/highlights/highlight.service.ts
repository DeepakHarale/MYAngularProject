import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HighlightService {
    constructor(private http: HttpClient, private constantService: NavigationService) { }

    GetHighlightsDetails() {
        
        const url = environment.baseUrl + 'Highlights/GetHighlight';
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

    // postData(requestObject: any): Observable<any> {
    //     return this.http
    //         .post<any>(environment.baseUrl + 'Highlights/AddHighlight', requestObject)
    //         .pipe(
    //             map(response => {
    //                 return response;
    //             }),
    //             catchError(error => {
    //                 return throwError(error);
    //             })
    //         );
    // }

    postData(apiName: string, requestObject: any): Observable<any> {
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

      

    // DeleteHighlightsDetails(item: any) {
    //     return this.http.post<any>(environment.baseUrl + 'Highlights/DeleteHighlights', item).pipe(
    //         map(response => {
    //             return response;
    //         }),
    //         catchError(error => {
    //             return throwError(error);
    //         })
    //     );
    // }


    DeleteHighlightsDetails(item: any) {
        return this.http.post<any>(environment.baseUrl + 'Highlights/DeleteHighlights', item).pipe(
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
            .put<any>(environment.baseUrl + 'Highlights/UpdateHighlights', updateUser)
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
