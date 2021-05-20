import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {Router} from '@angular/router';
import {Notification} from "../Model/notification";

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
  // @ts-ignore
  id:number;
  // @ts-ignore
  notifications: Notification[];
  constructor(private tokenStorageService: TokenStorageService,private accService:AccountService, private router:Router) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.fullname=this.tokenStorageService.getUser().fullName;
      this.roles = user.roles;
      this.username = user.username;
      this.id = user.id;
      this.accService.findnotification(this.id).subscribe(data=>{
        // @ts-ignore
        this.notifications = data;
        console.log(this.notifications);
      });
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
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  // @ts-ignore
  seen(id){
    this.accService.seen(id).subscribe();
    console.log(id);
  }

}
