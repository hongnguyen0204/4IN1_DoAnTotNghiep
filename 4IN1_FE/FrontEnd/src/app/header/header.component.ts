import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[AccountService]
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  // @ts-ignore
  username: string;
  // @ts-ignore
  fullname:string;
  // @ts-ignore
  users:Thongtincanhan;

  constructor(private tokenStorageService: TokenStorageService,
              private accService:AccountService,
              private router:Router,
              private toastr:ToastrService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.fullname=this.tokenStorageService.getUser().fullName;
      this.roles = user.roles;
      this.username = user.username;
    }
    let currentUrl = window.location.href;
    if(currentUrl.includes("admin")){
      this.showAdminBoard = true;
    } else {
      this.showAdminBoard = false;
    }
    this.accService.findUser(this.username).subscribe(data=>{
      this.users=data;
    });
  }

  dangKiSuKien(){
    if(!this.users.is_Update){
      this.toastr.warning("Bạn phải cập nhật thông tin cá nhân để thực hiện tính năng này!");
    } else {
      this.router.navigateByUrl('dangkitochuc');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
