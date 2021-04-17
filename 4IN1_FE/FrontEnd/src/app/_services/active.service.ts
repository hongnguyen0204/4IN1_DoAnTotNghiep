import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveService implements CanActivate{
  constructor(private tokenStorageService: TokenStorageService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.tokenStorageService.getToken();
    const currentUser =  this.tokenStorageService.getUser();
    if (token !== null && this.isRole()){
      this.router.navigateByUrl('/admin/dashboard').then(() => {
        window.location.reload();
      });
      return false;
    } else if (token !== null) {
        this.router.navigateByUrl('').then(() => {
          window.location.reload();
        });
        return false;
      }
     else {
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
