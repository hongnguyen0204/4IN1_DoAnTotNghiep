import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CongtacvienService {

  constructor(private http: HttpClient) { }

  findAll():Observable<any>{
    return this.http.get<any>('http://localhost:8080/quanlycongtacvien/all')
  }

  // @ts-ignore
  updateok(id):Observable<any>{
    // @ts-ignore
    return this.http.put(`${'http://localhost:8080/quanlycongtacvien/dongyduyet'}/${id}`);
  }

  // @ts-ignore
  updatenotok(id):Observable<any>{
    // @ts-ignore
    return this.http.put(`${'http://localhost:8080/quanlycongtacvien/tuchoiduyet'}/${id}`);
  }



}
