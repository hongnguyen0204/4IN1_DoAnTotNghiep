import { Component, OnInit } from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Component({
  selector: 'app-doimatkhau',
  templateUrl: './doimatkhau.component.html',
  styleUrls: ['./doimatkhau.component.scss'],
  providers: [QuenmatkhauService]
})
export class DoimatkhauComponent implements OnInit {
  // @ts-ignore
  password: string;
  // @ts-ignore
  token: string;
  acc:Thongtincanhan=new Thongtincanhan();
  constructor(private quenmatkhauservice: QuenmatkhauService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
   this.token = this.router.snapshot.params['token'];
   console.log(this.token);
  }

  doimatkhau(token: string,password: string){
    this.acc.reset_password_token=token;
    this.acc.password=password;
    this.quenmatkhauservice.doimatkhau(this.acc).subscribe();
    alert("Đổi mật khẩu thành công");
  }

}
