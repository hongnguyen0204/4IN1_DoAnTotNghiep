import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root',
})

export class CustomerAuthService implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private matSnackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();

    if (token == null) {
      this.router.navigateByUrl('/dangnhap');
      this.matSnackBar.open('Bạn cần đăng nhập để thực hiện tác vụ!', 'Ok', {
        duration: 4000,
      });
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/dangnhap');
      this.matSnackBar.open('Bạn không có quyền truy cập trang này!', 'Ok', {
        duration: 4000,
      });
      return false;
    }  else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getUser().roles;
    for (const role of tokenPayload) {
      if (role === 'ROLE_USER') {
        return true;
      }
    }
    return false;
  }
}
