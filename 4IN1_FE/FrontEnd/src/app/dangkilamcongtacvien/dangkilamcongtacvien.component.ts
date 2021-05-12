import {Component, Inject, OnInit} from '@angular/core';
import {Thongtincanhan} from "../Model/thongtincanhan";
import {SukienService} from "../Service/sukien.service";
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from "../_services/token-storage.service";
import {AccountService} from "../Service/account.service";
import {DangkilamctvService} from '../Service/dangkilamctv.service';
import {Dangkilamctv} from '../Model/dangkilamctv';
import {ToastrService} from 'ngx-toastr';
import {Sukien} from '../Model/sukien';


// @ts-ignore
@Component({
  selector: 'app-dangkilamcongtacvien',
  templateUrl: './dangkilamcongtacvien.component.html',
  styleUrls: ['./dangkilamcongtacvien.component.scss'],
  providers:[DangkilamctvService,AccountService,SukienService]
})
export class DangkilamcongtacvienComponent implements OnInit {

  currentUser: any;
  // @ts-ignore
  id:string;
  // @ts-ignore
  users:Thongtincanhan;
  // @ts-ignore
  dkctv : Dangkilamctv = new Dangkilamctv();
  // @ts-ignore
  sukien: Sukien=new Sukien();
  // @ts-ignore
  check:boolean;

  constructor(private router: ActivatedRoute,
              private token: TokenStorageService,
              private accountService:AccountService,
              private dangkilamctvService:DangkilamctvService,
              private toastr: ToastrService,
              private sukienService:SukienService,
              private route:Router) { }


  ngOnInit(): void {

    this.id = this.router.snapshot.params['id'];
    this.sukienService.getSK(this.id).subscribe(data => {
      this.sukien = data;
    }, error => console.log(error));
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.dkctv.user_ID = this.users.id;
    });
  }

   gui(){
    this.dkctv.event_ID = this.sukien.id;
    this.dangkilamctvService.create(this.dkctv).subscribe(data =>{
      this.dkctv = data;

    });
    this.toastr.success("Đăng kí thành công!");
  }
}
