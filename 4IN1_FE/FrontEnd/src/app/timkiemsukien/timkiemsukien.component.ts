import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timkiemsukien',
  templateUrl: './timkiemsukien.component.html',
  styleUrls: ['./timkiemsukien.component.scss'],
  providers: [SukienService, DatePipe]
})
export class TimkiemsukienComponent implements OnInit {
  p: number =1;
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
  constructor(private sukienService: SukienService, public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    var dtToday = this.start;
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
      { // @ts-ignore
        month = '0' + month.toString();
      }
    if(day < 10)
      { // @ts-ignore
        day = '0' + day.toString();
      }
    var minDate= year + '-' + month + '-' + day;
    $('#txtDate').attr('min', minDate);
  }



  // tslint:disable-next-line:typedef
  reloadData() {
    this.sukienService.findAllsk().subscribe(data => {
      this.sukiens = data;
    });
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  findByDay(start, end, searchtext){
    start =this.datepipe.transform(start, 'dd-MM-yyyy');
    end =this.datepipe.transform(end, 'dd-MM-yyyy');
      this.sukienService.findByDay(start, end, searchtext).subscribe(data => {
        this.sukiens = data;
      });
      console.log(start);
      console.log(end);
      console.log(this.sukiens);
  }

  // @ts-ignore
  timkiem(searchtext){
    this.sukienService.findByText(searchtext).subscribe(data =>{
      this.sukiens = data;
    });
    console.log(this.sukiens);
  }

  detaikSK(id: number) {
    this.router.navigate(['dangkithamgia',id])
  }
}
