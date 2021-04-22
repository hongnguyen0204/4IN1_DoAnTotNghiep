
import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {Observable} from 'rxjs';
import {Sukien} from '../Model/sukien';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Congtacvien} from '../Model/congtacvien';


// @ts-ignore
@Injectable()
export class SukienService {

  constructor(private http: HttpClient) { }

// @ts-ignore
  findByMonth(thang): Observable<Sukien[]>{
    return this.http.get<Sukien[]>(`${'http://localhost:8080/sukien/theothang'}/${thang}`);
  }

  // @ts-ignore
  findByDay(ngay1, ngay2): Observable<Sukien[]>{
    return this.http.get<Sukien[]>(`${'http://localhost:8080/sukien/theongay'}/${ngay1}/${ngay2}`);
  }

  // @ts-ignore
  findAll(): Observable<Sukien[]>{
    return this.http.get<Sukien[]>('http://localhost:8080/sukien/sukiendangcho');
  }

  findAllsk(): Observable<Sukien[]>{
    return this.http.get<Sukien[]>('http://localhost:8080/sukien/all');
  }

  findSKDD(): Observable<Sukien[]>{
    return this.http.get<Sukien[]>('http://localhost:8080/sukien/sukiendaduyet');
  }

  findSKDH(): Observable<Sukien[]>{
    return this.http.get<Sukien[]>('http://localhost:8080/sukien/sukiendahuy');
  }

  // @ts-ignore
  create(data): Observable<any>{
    return this.http.post<Sukien>('http://localhost:8080/sukien/add', data);
  }
  // @ts-ignore
  getSKbyiduser(id): Observable<Sukien[]>{
    // @ts-ignore
    return this.http.get<Sukien[]>(`${'http://localhost:8080/sukien/theoid'}/${id}`);
  }

  // @ts-ignore
  getSKbyid(id):Observable<any>{
    // @ts-ignore
    return this.http.get<any>(`${'http://localhost:8080/quanlycongtacvien/theoid'}/${id}`);
  }

  // @ts-ignore
  getSK(id): Observable<any> {
    return this.http.get(`${'http://localhost:8080/sukien'}/${id}`);
  }
  // @ts-ignore
  update(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/sukien/duyet'}/${id}`, data);
  }

  // @ts-ignore
  cancel(id, data): Observable<any> {
    return this.http.put(`${'http://localhost:8080/sukien/tuchoiduyet'}/${id}`, data);
  }

  // @ts-ignore
  dangKi(data):Observable<any>{
    return this.http.post<Dangkithamgia>('http://localhost:8080/nguoithamgia/dangki', data);
  }

  // @ts-ignore
  find(id): Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/nguoithamgia'}/${id}`);
  }

  // @ts-ignore
  get(id): Observable<any>{
    return this.http.get<any>(`${'http://localhost:8080/nguoithamgia/infor'}/${id}`);
  }

  // @ts-ignore
  huyDangKi(data){
    return this.http.post('http://localhost:8080/nguoithamgia/delete',data);
  }

  // @ts-ignore
  kiemTra(data){
    return this.http.post('http://localhost:8080/sukien/kiemtra',data);
  }

  // @ts-ignore
  kiemTraTG(data){
    return this.http.post('http://localhost:8080/nguoithamgia/kiemtrathamgia',data);
  }
}

