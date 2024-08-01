import {Injectable} from "@angular/core";
import { MyBaseService } from "../helpers/My-Base-Service";
import {GetAllResponse} from "../models/get-all-response";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyConfig} from "../helpers/My-Config";

@Injectable({providedIn: 'root'})
export class GetAllService implements MyBaseService<void, GetAllResponse> {

  constructor(public httpClient:HttpClient) {
  }

  obradi(request: void): Observable<GetAllResponse> {
    let url = MyConfig.server_address + "/user/UserGetAllEndpoint";

    return this.httpClient.get<GetAllResponse>(url);
  }
}
