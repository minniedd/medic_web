import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user";
import {catchError, Observable, throwError} from "rxjs";
import {MyConfig} from "../helpers/My-Config";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient:HttpClient) {
  }

  public login(user: User):Observable<string> {
    let url = MyConfig.server_address + "/api/AuthEndpoint/login"

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(url, user, { headers, responseType: 'text' }).pipe(catchError(this.handleError));
  }

  public logout():Observable<string> {
    let url = MyConfig.server_address + "/api/AuthEndpoint/logout"

    return this.httpClient.post<string>(url, {}, { responseType: 'text' as 'json'}).pipe(catchError(this.handleError));
  }

  private handleError(error:any) {
    console.error("Error has occurred", error);

    return throwError(error);
  }
}
