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
export class LeaveApprovalService {
  
  constructor(private http:HttpClient, private constantService:NavigationService) { }


GetLeaveApprovaldetails() {
  const url = environment.baseUrl + 'Leave/GetAllLeave';
  return this.http.get<AllLeaveDTO[]>(url);
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



UpdateData(updateUser: any): Observable<any> {
  return this.http
      .post<any>(environment.baseUrl + 'Leave/UpdateLeaveStatus', updateUser)
      .pipe(
          map(response => {
              return response;
          }),
          catchError(error => {
              return throwError(error);
          })
      );
}

getAllLeave(){
  let url = 'http://assimilatetech-001-site2.btempurl.com/api/Leave/GetAllLeave';
  return this.http.get(url);
}


}
