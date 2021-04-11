import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';

@Component({
  selector: 'app-sukien',
  templateUrl: './sukien.component.html',
  styleUrls: ['./sukien.component.scss'],
  providers: [SukienService]
})
export class SukienComponent implements OnInit {
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  m: number; //Biến lấy tháng hiện tại
  constructor(private sukienService: SukienService) {
  }

  ngOnInit(): void {
    this.reloadData();
    var d = new Date();
    this.m = d.getMonth() + 1;
  }

  reloadData() {
    this.sukienService.findAll().subscribe(data => {
      this.sukiens = data;
    })
  }
}
