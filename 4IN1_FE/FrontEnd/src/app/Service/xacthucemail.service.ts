import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class XacthucemailService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  xacthucemail(token: string){
    // @ts-ignore
    return this.http.post(`${'http://localhost:8080/account/verification/'}${token}`);
  }

  // @ts-ignore
  guimail(email: string){
    // @ts-ignore
    return this.http.post(`${'http://localhost:8080/account/xacthucemail/'}${email}`);
  }
  guimailbyusername(username: string){
    // @ts-ignore
    return this.http.post(`${'http://localhost:8080/account/xacthucemailbyusername/'}${username}`);
  }
}
