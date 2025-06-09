import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getMemberDetails(member_id: number): Observable<any> {
    const headers = this.apiService.getApiHeader();

    return this.http.get<any>(
      `${environment.yks_service_url}member/member-details/${member_id}`,
      { headers }
    );
  }

  getAllMembers(): Observable<any> {
  const headers = this.apiService.getApiHeader();
  
  return this.http.get<any>(
    `${environment.yks_service_url}member`,
    { headers }
  );
}

// Updated addFamilyMember method
addFamilyMember(payload: any): Observable<any> {
  const headers = this.apiService.getApiHeader();

  return this.http.post<any>(
    `${environment.yks_service_url}member/add-family`,
    payload,
    { headers }
  );
}
}
