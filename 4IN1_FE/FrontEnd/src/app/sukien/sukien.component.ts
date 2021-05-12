import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sukien',
  templateUrl: './sukien.component.html',
  styleUrls: ['./sukien.component.scss'],
  providers: [SukienService]
})
export class SukienComponent implements OnInit {
  p: number =1;
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  m: Date = new Date();
  // @ts-ignore
  month:number = this.m.getMonth() + 1;
  // @ts-ignore
  constructor(private sukienService: SukienService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.month;
    this.dataMonth(this.month);
  }

  detailSK(id:number){
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0)
    })
  }

  dataMonth(id:number){
    this.sukienService.findByMonth(id).subscribe(data=>{
      this.sukiens=data;
    })
  }
}
