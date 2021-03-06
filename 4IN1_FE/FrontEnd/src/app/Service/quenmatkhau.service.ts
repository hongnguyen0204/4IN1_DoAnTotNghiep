import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Injectable({
  providedIn: 'root'
})
export class QuenmatkhauService {

  constructor(private http: HttpClient) { }

  findUserbyemail(email:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getAccbyemail'}/${email}`)
  }

  // @ts-ignore
  laymatkhauquaemail(email:string){
    // @ts-ignore
    return this.http.post(`${'http://localhost:8080/account/forgot_password/'}${email}`);
  }

  // @ts-ignore
  doimatkhau(data):Observable<any>{
    // @ts-ignore
    return this.http.post<Thongtincanhan>('http://localhost:8080/account/reset_password',data);
  }

  kiemtratoken(token:string){
    return this.http.get(`${'http://localhost:8080/account/forgot_password/'}${token}`);
  }

}
