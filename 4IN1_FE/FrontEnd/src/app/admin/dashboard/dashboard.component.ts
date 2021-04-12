import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../Service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers:[DashboardComponent]
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

  constructor(private dashboardService:DashboardService) { }

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
      this.tskdd.
    })
  }

}
