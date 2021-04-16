import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-quanlysukien',
  templateUrl: './quanlysukien.component.html',
  styleUrls: ['./quanlysukien.component.scss'],
  providers:[SukienService]
})
export class QuanlysukienComponent implements OnInit {
  // @ts-ignore
  dtOptions: { pagingType: string };
  // @ts-ignore
  dangkithamgia:any;
  // @ts-ignore
  id: number;
  // @ts-ignore
  id_SK: number;
  currentUser: any;
  // @ts-ignore
  users:Thongtincanhan=new Thongtincanhan();

  // @ts-ignore
  infor : Dangkithamgia=new Dangkithamgia();

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService,
              private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.id = this.users.id;
      this.skService.find(this.users.id).subscribe(data=>{
        this.dangkithamgia=data;
      });

    });
  }

  delete(id:number) {
    this.infor.acc_ID = this.id;
    this.infor.event_ID=id;
    console.log(this.infor.acc_ID);
    console.log(this.infor.event_ID);
    this.skService.huyDangKi(this.infor).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log(error));
  }

}
