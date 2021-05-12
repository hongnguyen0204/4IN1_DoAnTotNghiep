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
  pageChanged(event) {
    this.p = event;
    console.log(event);
    this.page = (event * 5) - 5;
    if (this.searchText == "" && this.start == null && this.end == null) {
      this.sukienService.findpage(this.page).subscribe(data => {
        this.sukiens = data;
        console.log(this.sukiens);
      });
    } else if (this.page >= 5 && this.start == null && this.end == null) {
      // @ts-ignore
      this.sukienService.findBytextofrecord(this.searchText, this.page).subscribe(data => {
        this.sukiens = data;
        console.log(this.sukiens);
        this.p = event;
      });
    }else if(this.searchText == "" && this.start != null && this.end != null){
      // @ts-ignore
      // @ts-ignore
      this.start =this.datepipe.transform(this.start, 'yyyy-MM-dd');
      // @ts-ignore
      this.end =this.datepipe.transform(this.end, 'yyyy-MM-dd');
      this.sukienService.findofdaypage(this.start, this.end, this.page).subscribe(data=>{
        this.sukiens = data;
        this.p = event;
      });
    }else{
      // @ts-ignore
      this.start =this.datepipe.transform(this.start, 'yyyy-MM-dd');
      // @ts-ignore
      this.end =this.datepipe.transform(this.end, 'yyyy-MM-dd');
      this.sukienService.findofdayandtextpage(this.start,this.end, this.searchText, this.page).subscribe(data => {
        this.sukiens = data;
        this.p =event;
    });
  }
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
    this.p = 1;
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
          if(this.record<=5){
            this.sukienService.findByText(searchtext, this.record).subscribe(data => {
              this.sukiens = data;
              this.p = 1;
            });}else{
            this.sukienService.findByText(searchtext, 5).subscribe(data => {
              this.sukiens = data;
              console.log(this.sukiens);
              this.p =1;
            });
          }
          console.log("trường hợp text không null và ngày null");
        });
    }else if(searchtext == "" && start != null && end != null){
      start =this.datepipe.transform(start, 'yyyy-MM-dd');
      end =this.datepipe.transform(end, 'yyyy-MM-dd');
      this.sukienService.findByrecordofday(start,end).subscribe(data=>{
          // @ts-ignore
        this.record = data;
        if(this.record<=5){
          this.sukienService.findofday(start,end, this.record).subscribe(data => {
            this.sukiens = data;
            this.p = 1;
          });}else{
          this.sukienService.findofday(start,end, 5).subscribe(data => {
            this.sukiens = data;
            this.p =1;
          });
        }
      });
    }else{
      start =this.datepipe.transform(start, 'yyyy-MM-dd');
      end =this.datepipe.transform(end, 'yyyy-MM-dd');
        this.sukienService.findByrecordDayandtext(start,end,searchtext).subscribe(data=>{
          // @ts-ignore
          this.record = data;
          console.log(start);
          console.log(end);
          if(this.record<=5){
            this.sukienService.findofdayandtext(start,end, searchtext, this.record).subscribe(data => {
              this.sukiens = data;
              console.log(this.sukiens);
              this.p = 1;
            });}else{
            this.sukienService.findofdayandtext(start,end, searchtext, 5).subscribe(data => {
              this.sukiens = data;
              console.log(this.sukiens);
              this.p =1;
            });
          }
          console.log("trường hợp cả 3 không null")
        });
    }
    }

  detaikSK(id: number) {
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0)
    })
  }
}
