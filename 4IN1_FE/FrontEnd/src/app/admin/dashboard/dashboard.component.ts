import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../Service/dashboard.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {LoadService} from '../../_services/load.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit,OnDestroy {
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  // @ts-ignore
  dtOptions: any = {};
  // @ts-ignore
  skdtc:number;
  // @ts-ignore
  tsk:number;
  // @ts-ignore
  tskdd:number;
  // @ts-ignore
  tskdh:number;
  // @ts-ignore
  tsksdr:number;
  // @ts-ignore
  tongNguoi:number;
  // @ts-ignore
  tongSKTN:number;
  date:Date=new Date();
  // @ts-ignore
  ngay:number;
  // @ts-ignore
  thang:number;
  // @ts-ignore
  nam:number;
  thongkenguoidangki:any;
  thongkenguoiduyet:any;

  constructor(private dashboardService:DashboardService,
              private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.ngay=this.date.getDay();
    this.thang=this.date.getMonth();
    this.nam=this.date.getFullYear();
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
    };
    this.dashboardService.SKDTC().subscribe(data=>{
      this.skdtc=data;
    });
    this.dashboardService.TSK().subscribe(data=>{
      this.tsk=data;
    });
    this.dashboardService.TSKDD().subscribe(data=>{
      this.tskdd=data;
    });
    this.dashboardService.TSKDH().subscribe(data=>{
      this.tskdh=data;
    });
    this.dashboardService.TSKSDR().subscribe(data=>{
      this.tsksdr=data;
    });
    this.dashboardService.TongNguoi().subscribe(data=>{
      this.tongNguoi=data;
    });
    this.dashboardService.TongSKTN().subscribe(data=>{
      this.tongSKTN=data;
    });
    this.dashboardService.thongKeNguoiDangKi().subscribe(data=>{
      this.thongkenguoidangki=data;
      this.dtTrigger.next();
    });
    this.dashboardService.thongKeNguoiDuyet().subscribe(data=>{
      this.thongkenguoiduyet=data;
      this.dtTrigger1.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
