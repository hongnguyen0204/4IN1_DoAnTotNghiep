import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Quanlytintuc} from '../Model/quanlytintuc';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  findUser(user:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getAcc'}/${user}`)
  }

  checkBan(user:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getBan'}/${user}`)
  }

  findUserbyToken(token:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getAccTokenEmail'}/${token}`)
  }

  // @ts-ignore
  banUser(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/account/ban'}/${id}`, data);
  }

  // @ts-ignore
  unBanUser(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/account/unban'}/${id}`, data);
  }

  findAll(): Observable<Thongtincanhan[]>{
    return this.http.get<Thongtincanhan[]>('http://localhost:8080/account/getFullAcc');
  }
}
