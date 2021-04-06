import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';

@Component({
  selector: 'app-dangkithamgiasukien',
  templateUrl: './dangkithamgiasukien.component.html',
  styleUrls: ['./dangkithamgiasukien.component.scss'],
  providers: [SukienService]
})
export class DangkithamgiasukienComponent implements OnInit {
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  sukien: Sukien;

  constructor(private sukienService: SukienService ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.reloadData();
  }

  reloadData(){
    this.sukienService.findAll().subscribe(data=>{
      this.sukiens = data;
    })
  }

}
