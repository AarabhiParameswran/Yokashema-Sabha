import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private authService: AuthenticationService) { }

  getApiHeader(): HttpHeaders {
    const token = TokenStorageService.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
