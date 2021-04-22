import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../Service/dashboard.service';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardService]
})
export class DashboardComponent implements OnInit {

  // @ts-ignore
  dtOptions: { pagingType: string };
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
  constructor(private dashboardService:DashboardService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
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
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
