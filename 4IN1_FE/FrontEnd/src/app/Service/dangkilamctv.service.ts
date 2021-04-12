import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dangkilamctv} from '../Model/dangkilamctv';


@Injectable({
  providedIn: 'root'
})
export class DangkilamctvService {

  constructor(private http: HttpClient) { }
  // @ts-ignore
  create(data): Observable<any>{
    return this.http.post<Dangkilamctv>('http://localhost:8080/dangkilamctv/dangki', data);
  }
}