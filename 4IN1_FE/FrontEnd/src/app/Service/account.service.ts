import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  findUser(user:string):Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/account/getAcc'}/${user}`)
  }
}
