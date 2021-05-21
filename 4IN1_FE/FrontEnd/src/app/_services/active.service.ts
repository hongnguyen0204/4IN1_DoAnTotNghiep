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
    if (token !== null) {
        this.router.navigateByUrl('').then(() => {
          window.location.reload();
        });
        return false;
      }
     else {
      return true;
    }
  }
}
