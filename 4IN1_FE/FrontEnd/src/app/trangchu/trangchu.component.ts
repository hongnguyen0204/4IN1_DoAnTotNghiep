import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  providers: [SukienService]
})
export class TrangchuComponent implements OnInit {
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  m :number; //Biến lấy tháng hiện tại

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
