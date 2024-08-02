import {MyBaseService} from "../helpers/My-Base-Service";
import {AddUserRequest} from "../models/add-user-request";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyConfig} from "../helpers/My-Config";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AddUserService implements MyBaseService<AddUserRequest, number> {
    constructor(private httpClient:HttpClient) {
    }

    obradi(request: AddUserRequest): Observable<number> {
        let url = MyConfig.server_address + "/user/AuthEndpoint/AddUser";

        return this.httpClient.post<number>(url, request);
    }
}

