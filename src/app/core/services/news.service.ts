import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private apiService: ApiService) {}

  getStateOrUsualNews(category: string): Observable<any> {
    // const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}news/get-news-by-category/?category=${category}`,
      // { headers }
    );
  }

  getJillaNews(category: string, district_code: number): Observable<any> {
    // const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}news/get-news-by-category/?category=${category}&district_id=${district_code}`,
      // { headers }
    );
  }
}