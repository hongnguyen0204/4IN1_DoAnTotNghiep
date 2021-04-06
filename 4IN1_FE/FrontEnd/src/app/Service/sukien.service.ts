import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Sukien} from '../Model/sukien';


@Injectable()
export class SukienService {

  constructor(private http: HttpClient) { }

  // @ts-ignore
  findAll(): Observable<Sukien[]>{
      return this.http.get<Sukien[]>('http://localhost:8080/sukien');
  }
}

