
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs';
import {Sukien} from '../Model/sukien';


// @ts-ignore
@Injectable()
export class SukienService {

  constructor(private http: HttpClient) { }

// @ts-ignore
  findByMonth(thang): Observable<Sukien[]>{
    return this.http.get<Sukien[]>(`${'http://localhost:8080/sukien/theothang'}/${thang}`);
  }

  // @ts-ignore
  findAll(): Observable<Sukien[]>{
      return this.http.get<Sukien[]>('http://localhost:8080/sukien/all');
  }

  // @ts-ignore
  create(data): Observable<any>{
    return this.http.post<Sukien>('http://localhost:8080/sukien/add', data);
  }

  // @ts-ignore
  get(id): Observable<any> {
    return this.http.get(`${'http://localhost:8080/sukien/'}/${id}`);
  }
  // @ts-ignore
  update(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/sukien/duyet'}/${id}`, data);
  }

  // @ts-ignore
  cancel(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/sukien/tuchoiduyet'}/${id}`, data);
  }

}

