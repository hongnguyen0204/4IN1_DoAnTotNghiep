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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 8a603050f8056774f64fc5ed79dc23390326c148
  findUserbyEmail(email:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getAccbyemail'}/${email}`)
  }

  checkBan(user:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getBan'}/${user}`)
  }
<<<<<<< HEAD

=======
>>>>>>> e9d1344cca0773e9561a3f518f8f366b5d34401f
>>>>>>> 8a603050f8056774f64fc5ed79dc23390326c148

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
