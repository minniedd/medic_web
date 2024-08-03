import {Injectable} from "@angular/core";
import {MyBaseService} from "../helpers/My-Base-Service";
import {UpdateDetailsRequest} from "../models/update/update-details.request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyConfig} from "../helpers/My-Config";
import {UpdateDetailsResponse} from "../models/update/update-details.response";

@Injectable({providedIn:"root"})
export class UpdateAllUserDetailsService implements MyBaseService<UpdateDetailsRequest, UpdateDetailsResponse> {
  constructor(private httpClient:HttpClient) {
  }

  obradi(request: UpdateDetailsRequest): Observable<UpdateDetailsResponse> {
    let url = MyConfig.server_address + `/user/GetDetailsByIdEndpoint/Update/${request.id}`;

    return this.httpClient.patch<UpdateDetailsResponse>(url,request);
  }
}
