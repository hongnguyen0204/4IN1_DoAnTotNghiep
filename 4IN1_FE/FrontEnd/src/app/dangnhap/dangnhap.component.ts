import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {Router} from '@angular/router';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {XacthucemailService} from '../Service/xacthucemail.service';

@Component({
  selector: 'app-dangnhap',
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.scss']
})
export class DangnhapComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  account: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  check=true;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private xacthucmailservice: XacthucemailService,
              private router:Router, private accountservice: AccountService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.accountservice.findUser(this.form.username).subscribe(data=>{
      this.account = data;
      if(!this.account.status_acc){
          this.check=false;
          console.log(this.form.username);
          this.xacthucmailservice.guimailbyusername(this.form.username).subscribe();
      } else {
        this.authService.login(this.form).subscribe(
          data => {
            this.check=true;
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
            this.router.navigate(['trangchu']).then(() => {
              window.location.reload();
            });
          },
          err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        );
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
