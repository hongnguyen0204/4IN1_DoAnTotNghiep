import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
// @ts-ignore
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  // @ts-ignore
  username: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.username = user.username;
    }
    let currentUrl = window.location.href;
    if(currentUrl.includes("admin")){
      this.showAdminBoard = true;
    } else {
      this.showAdminBoard = false;
    }
  }
}
