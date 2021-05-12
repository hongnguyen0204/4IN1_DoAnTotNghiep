import { Component, OnInit } from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';
import {ActivatedRoute} from '@angular/router';
import {XacthucemailService} from '../Service/xacthucemail.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Component({
  selector: 'app-xacthucemail',
  templateUrl: './xacthucemail.component.html',
  styleUrls: ['./xacthucemail.component.scss'],
  providers: [XacthucemailService, AccountService]

})
export class XacthucemailComponent implements OnInit {
  // @ts-ignore
  token: string;
  // @ts-ignore
  tt: boolean;
  // @ts-ignore
  trangthai: string;

  constructor(private xacthuceamilservice: XacthucemailService,
              private accountservice: AccountService,
              private router:ActivatedRoute) { }

  // @ts-ignore
  ngOnInit(): void {
    this.token = this.router.snapshot.params['token'];
    // @ts-ignore
    this.xacthuctoken(this.token);
    // @ts-ignore
    this.timtaikhoan(this.token);
    // @ts-ignore
  }


  xacthuctoken(token: string){
    // @ts-ignore
    this.xacthuceamilservice.xacthucemail(token).subscribe();
  }

  timtaikhoan(token: string) {

    this.accountservice.findUserbyToken(token).subscribe(data => {
      console.log(data["status_acc"]);
      if(data["status_acc"]){
        this.trangthai = "Xác thực Email thành công";
      }
      else{
        window.location.reload();
      }
    });
  }
}
