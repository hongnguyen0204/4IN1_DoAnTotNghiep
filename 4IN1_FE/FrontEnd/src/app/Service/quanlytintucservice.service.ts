// @ts-ignore
import { Injectable } from '@angular/core';
import {Sukien} from "../Model/sukien";
import {Quanlytintuc} from "../Model/quanlytintuc";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

// @ts-ignore
@Injectable()
export class QuanlytintucserviceService {

  // @ts-ignore
  //dich vụ
  constructor(private http: HttpClient) { }
  // @ts-ignore
  findAll(): Observable<Quanlytintuc[]>{
    return this.http.get<Quanlytintuc[]>('http://localhost:8080/quanlytintuc/all');
  }
  // @ts-ignore
  delete(id): Observable<any> {
    return this.http.delete(`${'http://localhost:8080/quanlytintuc/delete'}/${id}`);
  }

  // @ts-ignore
  create(data): Observable<any>{
    return this.http.post<Quanlytintuc>('http://localhost:8080/quanlytintuc/add', data);
  }

  // @ts-ignore
  update(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/quanlytintuc/'}/${id}`, data);
  }

  // @ts-ignore
  get(id): Observable<any> {
    return this.http.get(`${'http://localhost:8080/quanlytintuc/'}/${id}`);
  }
}
