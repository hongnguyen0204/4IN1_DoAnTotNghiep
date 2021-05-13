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
  content :String;
  // @ts-ignore
  acc;
  // @ts-ignore
  id;
  // @ts-ignore
  idevent: number;
  constructor(private sk :SukienService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['idevent'];
    this.acc = this.sk.email(this.id).subscribe(data=>{
      this.acc=data;
      console.log(this.acc);
    });
  }
  guiamailnhacnho(){
    // @ts-ignore
    this.sk.guimailnn(this.guinhacnhac).subscribe();
  }
}
