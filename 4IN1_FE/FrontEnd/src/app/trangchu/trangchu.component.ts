import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {getLocaleMonthNames} from '@angular/common';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  providers: [SukienService]
})
export class TrangchuComponent implements OnInit {
  // @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  m: Date = new Date();
  // @ts-ignore
  month:number = this.m.getMonth() + 1;
  // @ts-ignore
  sukiens: Sukien[];
  constructor(private sukienService: SukienService) {
  }

  ngOnInit(): void {
    this.month;
    this.dataMonth(this.month);
  }

  dataMonth(id:number){
    this.sukienService.findByMonth(id).subscribe(data=>{
      this.sukien=data;
    })
  }

  reloadData() {
    this.sukienService.findAll().subscribe(data => {
      this.sukiens = data;
    })
  }



}
