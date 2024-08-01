import {Observable} from "rxjs";

export interface MyBaseService<TRequest, TResponse>{
  obradi(request: TRequest): Observable<TResponse>;
}
