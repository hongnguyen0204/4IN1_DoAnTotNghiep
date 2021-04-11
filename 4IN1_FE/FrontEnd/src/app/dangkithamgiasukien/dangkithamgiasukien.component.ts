import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';

@Component({
  selector: 'app-dangkithamgiasukien',
  templateUrl: './dangkithamgiasukien.component.html',
  styleUrls: ['./dangkithamgiasukien.component.scss'],
  providers: [SukienService]
})
export class DangkithamgiasukienComponent implements OnInit {
  // @ts-ignore
  sukien: Sukien=new Sukien();

  // @ts-ignore
  dK:Dangkithamgia=new Dangkithamgia();
  // @ts-ignore
  id:number;
  constructor(private sukienService: SukienService,private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.sukienService.get(this.id).subscribe(data=>{
      this.sukien=data;
    },error => console.log(error));

  }

  // @ts-ignore
  dangKi(id:number,idSK:number){
  this.dK.acc_ID=id;
  this.dK.event_ID=idSK;
  this.sukienService.dangKi(this.dK).subscribe();
  this.router.navigate(['quanlysukien']);
  }

}
