import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {ThongbaoService} from '../_services/thongbao.service';

@Component({
  selector: 'app-doimatkhau',
  templateUrl: './doimatkhau.component.html',
  styleUrls: ['./doimatkhau.component.scss'],
  providers: [QuenmatkhauService]
})
export class DoimatkhauComponent implements OnInit {
  // @ts-ignore
  @ViewChild('appendTo', { read: ViewContainerRef }) public appendTo: ViewContainerRef;

  // @ts-ignore
  password: string;
  // @ts-ignore
  token: string;
  acc:Thongtincanhan=new Thongtincanhan();
  constructor(private quenmatkhauservice: QuenmatkhauService,
              private router:ActivatedRoute,
              private thongbao:ThongbaoService) { }

  ngOnInit(): void {
    // @ts-ignore
   this.token = this.router.snapshot.params['token'];
   console.log(this.token);
  }

  doimatkhau(token: string,password: string){
    this.acc.reset_password_token=token;
    this.acc.password=password;
    this.quenmatkhauservice.doimatkhau(this.acc).subscribe();
    this.thongbao.showSuccess("Đổi mật khẩu thành công!",this.appendTo)
  }

}
