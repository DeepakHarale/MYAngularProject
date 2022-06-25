import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http:HttpClient) { }

  postData(body: any): Observable<any> {
   // const httpOptions = this.getHeaders();
    return this.http.get<any>(environment.baseUrl + 'Forgotpassword/ForgotPassword?UserName='+body)
      .pipe(map((response) => {
        return response;
      }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
