import { Component, OnInit } from '@angular/core';
import {CongtacvienService} from '../Service/congtacvien.service';
import {Congtacvien} from '../Model/congtacvien';
import {ActivatedRoute, Router} from '@angular/router';
import {Thongtintaikhoan} from '../Model/thongtintaikhoan';

@Component({
  selector: 'app-quanlycongtacvien',
  templateUrl: './quanlycongtacvien.component.html',
  styleUrls: ['./quanlycongtacvien.component.scss'],
  providers: [CongtacvienService, Thongtintaikhoan]
})
export class QuanlycongtacvienComponent implements OnInit {

  // @ts-ignore
  thongtintaikhoans: Thongtintaikhoan[];
  // @ts-ignore
  dtOptions: {pagingType: string};

  // @ts-ignore

  constructor(private ctvService: CongtacvienService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.ctvService.findAll().subscribe(data =>{
      // @ts-ignore
      this.thongtintaikhoans = data;
    })
    this.reloadData();
  }

  reloadData(){
    this.ctvService.findAll().subscribe(data=>{
      // @ts-ignore
      this.thongtintaikhoans = data;
    })
  }

}
