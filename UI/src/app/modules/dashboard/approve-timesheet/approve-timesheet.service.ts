import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { AllLeaveDTO } from '@app/modules/shared/model/leave.model';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApproveTimesheetService {

  constructor(private http:HttpClient, private constantService:NavigationService) { }


  // GetLeaveApprovaldetails() {
  //   const url = environment.baseUrl + 'Leave/GetAllLeave';
  //   return this.http.get<AllLeaveDTO[]>(url);
  // }

  getTimesheet(weekNo: number): Observable<any> {
    return this.http
        .get<any>(environment.baseUrl + 'WeeklyTimeSheet/GetTimeSheet/' + weekNo )
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                return throwError(error);
            })
        );
  }

  updateStatus(data : any){
    return this.http
        .post<any>(environment.baseUrl + 'WeeklyTimeSheet/TimeSheetStatusUpdate', data )
        .pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
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
        'Authorization': 'Bearer ' + token ? token : ''
      })
    };
  }



  
}
