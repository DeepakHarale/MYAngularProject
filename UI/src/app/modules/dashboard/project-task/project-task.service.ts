import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProjectTaskService {
    constructor(private http: HttpClient, private constantService: NavigationService) { }


    GetProjectTask() {
        const url = environment.baseUrl + 'Project/ProjectTask';
        return this.http.get(url);
    }

    getProjectTaskInfo() {
        const projectTaskUrl = environment.baseUrl + 'Project/ProjectTask';
        const projectUrl = environment.baseUrl + 'Project/Project';
        return forkJoin([this.http.get(projectTaskUrl), this.http.get(projectUrl)]);
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
    postData(requestObject: any): Observable<any> {
        return this.http
            .post<any>(environment.baseUrl + 'Project/ProjectTask', requestObject)
            .pipe(
                map(response => {
                    return response;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    DeleteProjectTask(item: any) {
        return this.http
            .post<any>(
                environment.baseUrl +
                'Project/DeleteProjectTask?ProjectTasksId=' +
                item.projectsTaskId,
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

    UpdateData(updateUser: any): Observable<any> {
        return this.http
            .put<any>(environment.baseUrl + 'Project/UpdateProjectTask', updateUser)
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
