import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {XacthucemailService} from '../Service/xacthucemail.service';


@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.scss'],
  providers: [XacthucemailService]
})
export class DangkyComponent{
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  // @ts-ignore
  pwd:string;
  // @ts-ignore
  constructor(private authService: AuthService, private xacthucmailservice: XacthucemailService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        this.guimail(this.form.email);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );

  }
    guimail(email:string){
    console.log(this.form.email);
      this.xacthucmailservice.guimail(email).subscribe();
    }
}
