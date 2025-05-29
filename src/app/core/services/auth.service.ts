import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import { from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    user: User;

    constructor(private http: HttpClient) {
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }


    /**
     * Performs the auth
     * @param mobileNumber mobileNumber of user
     * @param otpotpof user
     */
    login(credentials : any) {
        return this.http.post(`${environment.yks_service_url}login`, credentials, {withCredentials: true});
    }

    /**
     * Performs the register
     * @param mobileNumber mobileNumber
     * @param otppassword
     */
    register(user: User) {
        // return from(getFirebaseBackend().registerUser(user));

        return from(getFirebaseBackend().registerUser(user).then((response: any) => {
            const user = response;
            return user;
        }));
    }

    /**
     * Reset password
     * @param mobileNumber mobileNumber
     */
    resetPassword(mobileNumber: string) {
        return getFirebaseBackend().forgetPassword(mobileNumber).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout(): void {
    TokenStorageService.clearToken();
    // this.sessionCountdown$.next('');
    // clearInterval(this.countdownInterval);
    this.http.post(`${environment.yks_service_url}logout`, {}, { withCredentials: true }).subscribe();
    window.location.href = '/auth/login';
  }
}

