import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

constructor(private http: HttpClient, private apiService: ApiService) {}

 
  getDistrictsList(): Observable<any> {
    const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}state/jilla`,
      { headers }
    );
  }
  getUpasabhaList(district_code : number): Observable<any> {
    const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}state/upasabha/${district_code}`,
      { headers }
    );
  }
  getUpasabhaFilesList(upasabha_code : number): Observable<any> {
    const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}state/upasabha/files/${upasabha_code}`,
      { headers }
    );
  }
}
