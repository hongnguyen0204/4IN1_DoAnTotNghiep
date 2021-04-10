import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Congtacvien} from '../Model/congtacvien';

@Injectable()
export class CongtacvienService {

  constructor(private http: HttpClient) { }

  findAll():Observable<Congtacvien[]>{
    return this.http.get<Congtacvien[]>('http://localhost:8080/congtacvien/all')
  }

  // @ts-ignore
  updateok(id,data):Observable<any>{
    return this.http.put(`${'http://localhost:8080/congtacvien/dongyduyet'}/{$id}`, data);
  }

  // @ts-ignore
  updatenotok(id,data):Observable<any>{
    return this.http.put(`${'http://localhost:8080/congtacvien/tuchoiduyet'}/{$id}`, data);
  }



}
