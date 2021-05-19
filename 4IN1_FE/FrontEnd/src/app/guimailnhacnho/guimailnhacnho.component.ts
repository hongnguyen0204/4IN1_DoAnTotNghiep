import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {CongtacvienService} from '../Service/congtacvien.service';
import {AccountService} from '../Service/account.service';
import {Subject} from 'rxjs';
import {ThongtincanhanService} from '../Service/thongtincanhan.service';


@Component({
  selector: 'app-guimailnhacnho',
  templateUrl: './guimailnhacnho.component.html',
  styleUrls: ['./guimailnhacnho.component.scss'],
  providers:[SukienService]
})
export class GuimailnhacnhoComponent implements OnInit {
  // @ts-ignore
  email: string;
  // @ts-ignore
  content :string;
  // @ts-ignore
  acc;
  // @ts-ignore
  id;
  // @ts-ignore
  idevent: number;
  constructor(private sk :SukienService,
              private route:ActivatedRoute) { }
  ngOnInit(): void {
   // this.layidevent();
  }
  // layidevent(){
  //   this.id=this.route.snapshot.params['idevent'];
  //   this.acc = this.sk.email(this.id).subscribe(data=>{
  //     this.acc=data;
  //     console.log(this.acc);
  //   });
  // }
  // // @ts-ignore
  // guiamailnhacnho(){
  //   // @ts-ignore
  //   //   console.log(this.content);
  //   //   this.sk.guimailnn(this.id, this.content).subscribe();
  //   // }
}
