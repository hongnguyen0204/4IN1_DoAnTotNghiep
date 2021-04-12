import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {Thongtintaikhoan} from '../Model/thongtintaikhoan';
import {AccountService} from '../Service/account.service';

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
  users:Thongtintaikhoan;

  constructor(private tokenStorageService: TokenStorageService,private accService:AccountService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
    this.accService.findUser(this.username).subscribe(data=>{
      this.users=data;
    })

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
