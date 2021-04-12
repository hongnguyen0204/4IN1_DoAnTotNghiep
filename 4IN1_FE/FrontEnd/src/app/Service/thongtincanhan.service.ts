import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThongtincanhanService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  update(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/thongtincanhan/'}/${id}`, data);
  }

  // @ts-ignore
  get(id): Observable<any> {
    return this.http.get(`${'http://localhost:8080/thongtincanhan/'}/${id}`);
  }
}
