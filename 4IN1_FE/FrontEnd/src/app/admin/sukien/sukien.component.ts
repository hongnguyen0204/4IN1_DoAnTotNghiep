import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {SukienService} from '../../Service/sukien.service';
import {Sukien} from '../../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {LoadService} from '../../_services/load.service';

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
export class SukienComponent implements OnInit {
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
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
    this.reload();
    this.SKDaDuyet();
    this.SKDaHuy();
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers'
    };
  }

  details(id: number){
    this.router.navigate(['admin/chitietsukien',id]).then(() => {
      window.scrollTo(0,0)
    })
  }

  reload(){
    this.skService.findAll().subscribe(data=>{
      this.sukien=data;
    });
  }

  SKDaDuyet(){
    this.skService.findSKDD().subscribe(data=>{
      this.sukienDD=data;
    });
  }
  SKDaHuy(){
    this.skService.findSKDH().subscribe(data=>{
      this.sukienDH=data;
    });
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
