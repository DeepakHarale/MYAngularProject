import { Injectable } from '@angular/core';
import { NavigationService } from '@app/modules/navigation/services';
import { UserDTO } from '@app/modules/shared/model/user.model';
import { Observable, ReplaySubject } from 'rxjs';

import { User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {
    user: UserDTO;
    constructor(public navigationService: NavigationService) {
        this.user = this.navigationService.getUserInfo();
    }

    // set user(user: UserDTO) {
    //     userSubject.next(user);
    // }

    // get user$(): Observable<UserDTO> {
    //     return userSubject.asObservable();
    // }

    getUser(){
        this.user = this.navigationService.getUserInfo();
    }
}
