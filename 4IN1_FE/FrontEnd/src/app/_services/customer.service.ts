import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Injectable({
  providedIn: 'root',
})

export class CustomerAuthService implements CanActivate{
  users:Thongtincanhan=new Thongtincanhan();

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private accountService:AccountService) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/dangnhap');

      return false;
    } else if(!this.isCheck()){
      this.router.navigateByUrl('/dangnhap');
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/dangnhap');

      return false;
    }  else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getUser().roles;
    for (const role of tokenPayload) {
      if (role === 'ROLE_USER' || role === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }

  isCheck(){
    this.accountService.findUser(this.tokenStorageService.getUser().username).subscribe(data=>{
      this.users=data;
    });
    if(this.users.status_acc==false) {
      return false
    } else {
      return true};
  }
}
