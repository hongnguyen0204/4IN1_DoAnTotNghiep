import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ThongbaoService} from '../_services/thongbao.service';

@Component({
  selector: 'app-dangkithamgiasukien',
  templateUrl: './dangkithamgiasukien.component.html',
  styleUrls: ['./dangkithamgiasukien.component.scss'],
  providers: [SukienService],

})
export class DangkithamgiasukienComponent implements OnInit {
  // @ts-ignore
  @ViewChild('appendTo', { read: ViewContainerRef }) public appendTo: ViewContainerRef;
  // @ts-ignore
  sukien: Sukien=new Sukien();
  // @ts-ignore
  id: number;
  // @ts-ignore
  ev_id:number;
  currentUser: any;
  // @ts-ignore
  users:Thongtincanhan=new Thongtincanhan();
  // @ts-ignore
  dK:Dangkithamgia=new Dangkithamgia();
  // @ts-ignore
  id:number;

  constructor(private sukienService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService,
              private token: TokenStorageService ,
              private thongbao:ThongbaoService) { }

  ngOnInit(): void {
    this.ev_id=this.route.snapshot.params['id'];
    console.log(this.ev_id);
    this.sukienService.getSK(this.ev_id).subscribe(data=>{
      this.sukien=data;
    },error => console.log(error));

    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.id=this.users.id;
      console.log(this.id);
    });
  }

  // @ts-ignore
  dangKi(id:number,idSK:number){
  this.dK.acc_ID=id;
  this.dK.event_ID=idSK;
    this.sukienService.kiemTraTG(this.dK).subscribe(data=>{
      if(data!=0){
        this.thongbao.showWarning("Bạn đã đăng kí tham gia sự kiện này rồi",this.appendTo);
      } else {
        this.sukienService.dangKi(this.dK).subscribe();
        this.router.navigate(['quanlysukien']).then(() => {
          window.location.reload();
        });
      }
    })
  }
}
