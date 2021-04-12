import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

    SKDTC():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongSuKienDaToChuc');
    }

  TSK():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongSuKien');
    }

  TSKDD():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongSuKienDaDuyet');
  }

  TSKDH():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongSuKienBiHuy');
  }

  TSKSDR():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongSuKienDangCho');
  }

  TongNguoi():Observable<number>{
    return this.http.get<number>('http://localhost:8080/sukien/tongNguoiThamGia');
  }
}
