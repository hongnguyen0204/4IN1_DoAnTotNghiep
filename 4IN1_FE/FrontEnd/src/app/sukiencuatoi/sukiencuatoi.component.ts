import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {ThongtincanhanService} from '../Service/thongtincanhan.service';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CongtacvienService} from '../Service/congtacvien.service';
import * as $ from 'jquery';
import {Sukien} from '../Model/sukien';
import {Congtacvien} from '../Model/congtacvien';

@Component({
  selector: 'app-sukiencuatoi',
  templateUrl: './sukiencuatoi.component.html',
  styleUrls: ['./sukiencuatoi.component.scss'],
  providers: [SukienService, ThongtincanhanService, CongtacvienService]
})
export class SukiencuatoiComponent implements OnInit {
// @ts-ignore
  dtOptions: { pagingType: string };
  currentUser: any;
  users: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  id: number;
  // @ts-ignore
  idevent: number;
  qlcongtacviens: any;
  // @ts-ignore
  status1: boolean;
// @ts-ignore
  tensukien:string;
  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private token: TokenStorageService,
              private ctvService: CongtacvienService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data => {
      this.users = data;
      this.id = this.users.id;
      // tslint:disable-next-line:no-shadowed-variable
      this.skService.getSKbyiduser(this.id).subscribe(data => {
        this.sukiens = data;
      });
      this.dtOptions = {
        pagingType: 'full_numbers'
      };
    });
    this.tsk();
  }

  // @ts-ignore
  duyet(status: boolean, id: number){
    console.log(status);
    if (status){
      this.ctvService.updatenotok(id).subscribe();
    }
    else {
      this.ctvService.updateok(id).subscribe();
    }
  }

  tsk(){
    this.skService.getSKbyid(this.idevent).subscribe(data =>{
      // @ts-ignore
      this.qlcongtacviens = data;
    });
  }
}
