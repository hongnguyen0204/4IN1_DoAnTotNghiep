import { Component, OnInit } from '@angular/core';
import {CongtacvienService} from '../Service/congtacvien.service';
import {Congtacvien} from '../Model/congtacvien';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {Qlcongtacvien} from '../Model/qlcongtacvien';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';

@Component({
  selector: 'app-quanlycongtacvien',
  templateUrl: './quanlycongtacvien.component.html',
  styleUrls: ['./quanlycongtacvien.component.scss'],
  providers: [CongtacvienService]
})
export class QuanlycongtacvienComponent implements OnInit {
  // @ts-ignore
  qlcongtacviens: any;


  constructor(private ctvService: CongtacvienService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.ctvService.findAll().subscribe(data =>{
      // @ts-ignore
      this.qlcongtacviens = data;
    })
    this.reloadData();
  }

  kiemtra(check:boolean){
    if(check){
      $('#hau').prop('checked',true);
    }
  }

  // @ts-ignore
  duyet(status: boolean, id: number){
    console.log(status)
    if(status){
      this.ctvService.updatenotok(id).subscribe();
    }
    else {
     this.ctvService.updateok(id).subscribe();
    }
  }

  reloadData(){
    this.ctvService.findAll().subscribe(data=>{
      // @ts-ignore
      this.qlcongtacviens = data;
    })
  }
}
