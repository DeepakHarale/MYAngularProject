import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

 
  verifyCode(userId:string): Observable<any> {
   // const httpOptions = this.getHeaders();
    return this.http.get<any>(environment.baseUrl + 'Forgotpassword/VerifyCode?Code='+ userId)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
//   getHeaders() {
//     const token = this.constantService.getToken();
//     return {
//         headers: new HttpHeaders({
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json',
//             'contentType': 'application/json; charset=UTF-8',
//             Authorization: 'Bearer ' + token ? token : '',
//         }),
//     };
// }
   ResetPassword(body:any): Observable<any> {
     return this.http.post<any>(environment.baseUrl + 'Forgotpassword/ResetPassword',body)
       .pipe(map((response) => {
         return response;
       }),
         catchError((error) => {
           return throwError(error);
         })
       );
   }
}
