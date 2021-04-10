import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {SukienService} from '../../Service/sukien.service';
import {Sukien} from '../../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-sukien',
  templateUrl: './sukien.component.html',
  styleUrls: ['./sukien.component.scss'],
  providers:[SukienService]
})
export class SukienComponent implements OnInit {
  // @ts-ignore
  dtOptions: { pagingType: string };
  // @ts-ignore
  sukien: Sukien[];
  constructor(private skService:SukienService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.skService.findAll().subscribe(data=>{
      this.sukien=data;
    })
  }

  details(id: number){
    this.router.navigate(['admin/chitietsukien',id])
  }
}
