import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {LoadService} from '../_services/load.service';

@Component({
  selector: 'app-quanlysukien',
  templateUrl: './quanlysukien.component.html',
  styleUrls: ['./quanlysukien.component.scss'],
  providers:[SukienService]
})
export class QuanlysukienComponent implements OnInit {
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  // @ts-ignore
  dangkithamgia:any;
  // @ts-ignore
  id: number;
  // @ts-ignore
  id_SK: number;
  currentUser: any;
  // @ts-ignore
  users: Thongtincanhan=new Thongtincanhan();
  // @ts-ignore
  infor : Dangkithamgia=new Dangkithamgia();

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService,
              private token: TokenStorageService) {}

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.id = this.users.id;
      this.skService.find(this.users.id).subscribe(data=>{
        this.dangkithamgia=data;
      });
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  delete(id:number) {
    this.infor.acc_ID = this.id;
    this.infor.event_ID=id;
    this.skService.huyDangKi(this.infor).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log(error));
  }

}
