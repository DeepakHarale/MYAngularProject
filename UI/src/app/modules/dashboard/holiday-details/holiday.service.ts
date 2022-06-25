import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HolidayService {
    constructor(private http: HttpClient, private constantService: NavigationService) { }

    GetHolidayDetails() {
        const url = environment.baseUrl + 'Holiday/GetHoliday';
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
            .post<any>(environment.baseUrl + 'Holiday/AddHolidayDeatils', requestObject)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    DeleteHolidayDetails(item: any) {
        return this.http.post<any>(environment.baseUrl + 'Holiday/DeleteHolidayDetails', item).pipe(
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
            .post<any>(environment.baseUrl + 'Holiday/UpdateHolidayDeatils', updateUser)
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
