// @ts-ignore
import { Injectable } from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs';
import {Sukien} from '../Model/sukien';


// @ts-ignore
@Injectable()
export class SukienService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  findAll(): Observable<Sukien[]>{
      return this.http.get<Sukien[]>('http://localhost:8080/sukien');
  }
}

