import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {QuanlytintucserviceService} from '../Service/quanlytintucservice.service';
import {Quanlytintuc} from '../Model/quanlytintuc';

@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss'],
  providers:[QuanlytintucserviceService]
})
export class TintucComponent implements OnInit {
  // @ts-ignore
  tintuc:Quanlytintuc[];
  constructor(private  quanlytintucserviceService: QuanlytintucserviceService,
              private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    // @ts-ignore
    this.quanlytintucserviceService.findAll().subscribe(data => {
      this.tintuc = data;
    });
  }

  detailTT(id:number){
    this.router.navigate(['chitiettintuc',id]);
  }
}
