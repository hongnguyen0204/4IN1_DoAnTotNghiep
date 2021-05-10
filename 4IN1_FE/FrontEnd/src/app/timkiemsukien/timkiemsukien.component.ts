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
  // @ts-ignore
  record: number;
  // @ts-ignore
  page: number;
  // @ts-ignore
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
  end:Date;
  // @ts-ignore
  middles: middle[];
  constructor(private sukienService: SukienService, public datepipe: DatePipe,
              private router: Router) { }
  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    $('#txtDate').attr('min', minDate);
  }

  // @ts-ignore
  pageChanged(event){
    this.p = event;
    console.log(event);
    event = (event*5)-5;
    this.sukienService.findpage(event).subscribe(data => {
      this.sukiens = data;
      console.log(this.sukiens);
    });
  }

  validatengay(){
    // @ts-ignore
    this.start =this.datepipe.transform(this.start, 'yyyy-MM-dd');
    // @ts-ignore
    $('#txtTo').attr('min', this.start);
  }
  // tslint:disable-next-line:typedef
  reloadData() {
    this.sukienService.findrecord().subscribe(data=>{
      this.record = data;
    });
    if(this.record<5){
    this.sukienService.findsk(this.record).subscribe(data => {
      this.sukiens = data;
    });}else{
      this.sukienService.findsk(5).subscribe(data => {
        this.sukiens = data;
      });
    }
  }
  // @ts-ignore
  timkiem(start, end, searchtext){
    if(start == null && end == null && searchtext == "")
    {
        this.reloadData();
        console.log("trường hợp cả 3 null")
        console.log(this.sukiens);
    }
      else if (start == null && end == null){
        this.sukienService.findByrecordoftext(searchtext).subscribe(data=>{
          // @ts-ignore
          this.record = data;
          if(this.record<5){
            this.sukienService.findByText(searchtext, this.record).subscribe(data => {
              this.sukiens = data;
            });}else{
            this.sukienService.findsk(5).subscribe(data => {
              this.sukiens = data;
            });
          }
          console.log("trường hợp text không null và ngày null")
          console.log(this.sukiens);
        });
    }else if(searchtext == "" && start != null && end != null){
      start =this.datepipe.transform(start, 'yyyy-MM-dd');
      end =this.datepipe.transform(end, 'yyyy-MM-dd');
      this.sukienService.findByDay(start,end).subscribe(data => {
        this.sukiens = data;
        console.log("trường hợp text null ngày không null")
        console.log(start);
        console.log(end);
        console.log(this.sukiens);
      });
    }else{
        this.sukienService.findByDayandtext(start,end,searchtext).subscribe(data=>{
          this.sukiens = data;
          console.log("trường hợp cả 3 không null")
          console.log(this.sukiens);
        })
    }
    }

  detaikSK(id: number) {
    this.router.navigate(['dangkithamgia',id])
  }
}
