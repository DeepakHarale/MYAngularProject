import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http:HttpClient) {}

    private apiUrl="http:/api/Employee/UpdateEmployee"

    

    getAuth$(): Observable<{}> {
        return of({});
    }
    forgetPassword(employee:any){
        return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.apiUrl}`,{
        requestType:'PASSWORD_RESET',
        email:employee.emailid
    });
}
}
