import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';

@Component({
  selector: 'app-timkiemsukien',
  templateUrl: './timkiemsukien.component.html',
  styleUrls: ['./timkiemsukien.component.scss'],
  providers: [SukienService, DatePipe]
})
export class TimkiemsukienComponent implements OnInit {
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  searchText;
  // @ts-ignore
  khoa;
  // @ts-ignore
  diadiem;
  // @ts-ignore
  start;
  // @ts-ignore
  end:Date = new Date();
  // @ts-ignore
  middles: middle[];
  constructor(private sukienService: SukienService, public datepipe: DatePipe ) { }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
  }

  // tslint:disable-next-line:typedef
  reloadData() {
    this.sukienService.findAllsk().subscribe(data => {
      this.sukiens = data;
    });
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  findByDay(start, end){
    start =this.datepipe.transform(start, 'dd-MM-yyyy');
    end =this.datepipe.transform(end, 'dd-MM-yyyy');
      this.sukienService.findByDay(start, end).subscribe(data => {
        this.sukiens = data;
      });
      console.log(start);
      console.log(end);
      console.log(this.sukiens);
  }

}
