import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    constructor(private http: HttpClient, private constantService: NavigationService) { }

    GetProjectDetails() {
        const url = environment.baseUrl + 'Project/Project';
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

    postData(requestObject: any): Observable<any> {
        const httpOptions = this.getHeaders();
        return this.http.post<any>(environment.baseUrl + 'Project/AddProject', requestObject).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }
    postEmployeeData(requestObject: any): Observable<any> {
        const httpOptions = this.getHeaders();
        return this.http.post<any>(environment.baseUrl + 'AssignProject/AddBulkAssignProject', requestObject).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }
    getEmployeeProject(id: any) {
        return this.http.get<any>(environment.baseUrl + 'AssignProject/GetAllEmployeeByProject/' +id).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }

    DeleteProject(item: any) {
        return this.http.post<any>(environment.baseUrl + 'Project/DeleteProject?ProjectId=' + item.projectId, '').pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
