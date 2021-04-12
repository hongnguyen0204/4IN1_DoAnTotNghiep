import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timkiemsukien',
  templateUrl: './timkiemsukien.component.html',
  styleUrls: ['./timkiemsukien.component.scss'],
  providers: [SukienService]
})
export class TimkiemsukienComponent implements OnInit {
// @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  m: Date = new Date();
  // @ts-ignore
  month:number = this.m.getMonth() + 1;
  // @ts-ignore
  constructor(private sukienService: SukienService,private router:Router) {
  }

  ngOnInit(): void {
    this.month;
    this.dataMonth(this.month);
  }

  detailSK(id:number){
    this.router.navigate(['dangkithamgia',id]);
  }

  dataMonth(id:number){
    this.sukienService.findByMonth(id).subscribe(data=>{
      this.sukien=data;
    })
  }

  // reloadData() {
  //   this.sukienService.findAll().subscribe(data => {
  //     this.sukiens = data;
  //   })
}
