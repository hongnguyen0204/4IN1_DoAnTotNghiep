import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate{

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    if (token == null) {
      this.router.navigateByUrl('/admin/login');
      return false;
    } else if (!this.isRole()) {
      this.router.navigateByUrl('/admin/login');
      return false;
    }  else {
      return true;
    }
  }
  isRole() {
    const tokenPayload = this.tokenStorageService.getUser().roles;
    for (const role of tokenPayload) {
      if (role === 'ROLE_ADMIN') {
        return true;
      }
    }
    return false;
  }
}
