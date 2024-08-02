import {Injectable} from "@angular/core";
import {MyBaseService} from "../helpers/My-Base-Service";
import {GetAllUserDetailsRequest} from "../models/get-all-user-details.request";
import {GetAllUserDetailsResponse} from "../models/get-all-user-details.response";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyConfig} from "../helpers/My-Config";

@Injectable({providedIn:"root"})
export class UserDetailsService implements MyBaseService<GetAllUserDetailsRequest, GetAllUserDetailsResponse> {
  constructor(private httpClient:HttpClient) {
  }

  obradi(request: GetAllUserDetailsRequest): Observable<GetAllUserDetailsResponse> {
    let url = MyConfig.server_address + `/user/GetDetailsByIdEndpoint/${request.id}`;

    return this.httpClient.get<GetAllUserDetailsResponse>(url);
  }
}
