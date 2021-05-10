import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {SukienService} from '../../Service/sukien.service';
import {Sukien} from '../../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {LoadService} from '../../_services/load.service';
import {Subject} from 'rxjs';

class DataTablesResponse {
  // @ts-ignore
  data: any[];
  // @ts-ignore
  draw: number;
  // @ts-ignore
  recordsFiltered: number;
  // @ts-ignore
  recordsTotal: number;
}

@Component({
  selector: 'app-sukien',
  templateUrl: './sukien.component.html',
  styleUrls: ['./sukien.component.scss'],
  providers:[SukienService]
})
export class SukienComponent implements OnInit,OnDestroy {
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  // @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  sukienDD: Sukien[];
  // @ts-ignore
  sukienDH: Sukien[];
  constructor(private skService:SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService
             ) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers'
    };
    this.skService.findAll().subscribe(data=>{
      this.sukien=data;
      this.dtTrigger.next();
    });
    this.skService.findSKDD().subscribe(data=>{
      this.sukienDD=data;
      this.dtTrigger1.next();
    });
    this.skService.findSKDH().subscribe(data=>{
      this.sukienDH=data;
      this.dtTrigger2.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  details(id: number){
    this.router.navigate(['admin/chitietsukien',id])
  }

  reloadDT(){
    this.skService.findAll().subscribe(data=>{
      this.sukien=data;
      this.dtTrigger.next();
    });
  }

  SKDaDuyet(){
    this.skService.findSKDD().subscribe(data=>{
      this.sukienDD=data;
      this.dtTrigger1.next();
    });
  }
  SKDaHuy(){
    this.skService.findSKDH().subscribe(data=>{
      this.sukienDH=data;
      this.dtTrigger2.next();
    });
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
