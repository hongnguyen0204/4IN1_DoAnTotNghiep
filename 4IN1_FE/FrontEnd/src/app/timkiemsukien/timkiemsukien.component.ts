import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';
import {consolidateMessages} from '@angular/localize/src/tools/src/extract/translation_files/utils';

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
  searchText = "";
  // @ts-ignore
  khoa;
  // @ts-ignore
  diadiem;
  // @ts-ignore
  start:Date;
  // @ts-ignore
  end:Date = new Date();
  // @ts-ignore
  middles: middle[];
  constructor(private sukienService: SukienService, public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    $('#txtDate').attr('min', minDate);
  }

  validatengay(){
    // @ts-ignore
    this.start =this.datepipe.transform(this.start, 'yyyy-MM-dd');
    // @ts-ignore
    $('#txtTo').attr('min', this.start);
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
  }

  // @ts-ignore
  timkiem(searchtext){
    if(searchtext==""){
      this.sukienService.findAllsk().subscribe(data => {
        this.sukiens = data;
      });
    }else{
      this.sukienService.findByText(searchtext).subscribe(data => {
        this.sukiens = data;
      });
    }
    console.log(this.sukiens);
  }

  detaikSK(id: number) {
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0)
    })
  }
}
