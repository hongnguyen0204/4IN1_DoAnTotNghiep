import {Component, Inject, OnInit} from '@angular/core';
import {Thongtincanhan} from "../Model/thongtincanhan";
import {SukienService} from "../Service/sukien.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {TokenStorageService} from "../_services/token-storage.service";
import {AccountService} from "../Service/account.service";
import {DangkilamctvService} from '../Service/dangkilamctv.service';
import {Dangkilamctv} from '../Model/dangkilamctv';
import {ToastrService} from 'ngx-toastr';

// @ts-ignore
@Component({
  selector: 'app-dangkilamcongtacvien',
  templateUrl: './dangkilamcongtacvien.component.html',
  styleUrls: ['./dangkilamcongtacvien.component.scss'],
  providers:[DangkilamctvService,AccountService]
})
export class DangkilamcongtacvienComponent implements OnInit {

  currentUser: any;
  // @ts-ignore
  id:string;
  // @ts-ignore
  users:Thongtincanhan;
  // @ts-ignore
  dkctv : Dangkilamctv=new Dangkilamctv();
  // @ts-ignore
  check:boolean;

  constructor(private router: Router,
              private token: TokenStorageService,
              private accountService:AccountService,
              private dangkilamctvService:DangkilamctvService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.dkctv.user_ID = this.users.id;
    });
  }

   gui(){
    this.dkctv.event_ID = 1;
    console.log(this.dkctv.user_ID);
    console.log(this.dkctv.event_ID);
    this.dangkilamctvService.create(this.dkctv).subscribe(data =>{
      this.dkctv = data;
      this.toastr.success("Đăng kí đã được gửi!");
    });
  }
}
