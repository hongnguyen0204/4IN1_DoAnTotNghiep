import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {ToastrService} from 'ngx-toastr';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CustomerAuthService implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private accountService:AccountService,
              private toastr:ToastrService) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    if (token == null) {
      this.router.navigateByUrl('/dangnhap');
      return false;
    } else if(!this.isCheck()){
      this.router.navigateByUrl('').then(() => {
        // @ts-ignore
        this.toastr.warning("Tài khoản của bạn chưa được xác thực!","",timeout(3000));
      });
      return false;
    } else if(this.isBan()){
      this.router.navigateByUrl('').then(() => {
        // @ts-ignore
        this.toastr.warning("Tài khoản của bạn đã bị cấm!","",timeout(3000));
      });
      return false;
    }  else if (!this.isRole()) {
      this.router.navigateByUrl('/dangnhap');
      return false;
    } else {
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
    let tokenPayload = this.tokenStorageService.getUser().status_acc;
      if (tokenPayload) {
        return true;
      };
    return false;
  }

  isBan(){
    let tokenPayload = this.tokenStorageService.getUser().ban;
    if (tokenPayload) {
      return true;
    };
    return false;
  }
}
