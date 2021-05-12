import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {Dangkilamctv} from '../Model/dangkilamctv';
import {DangkilamctvService} from '../Service/dangkilamctv.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dangkithamgiasukien',
  templateUrl: './dangkithamgiasukien.component.html',
  styleUrls: ['./dangkithamgiasukien.component.scss'],
  providers: [SukienService],

})
export class DangkithamgiasukienComponent implements OnInit {
  // @ts-ignore
  @ViewChild('appendTo', {read: ViewContainerRef}) public appendTo: ViewContainerRef;
  // @ts-ignore
  suKiens: Sukien[];
  sukien: Sukien = new Sukien();
  // @ts-ignore
  id: number;
  // @ts-ignore
  ev_id: number;
  currentUser: any;
  // @ts-ignore
  users: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  dK: Dangkithamgia = new Dangkithamgia();
  // @ts-ignore
  dangKiCTV: Dangkilamctv = new Dangkilamctv();
  checkCTV=false;
  checkNTG=false;
  checkThoiGian=0;
  constructor(private sukienService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private dangkiCTVSV: DangkilamctvService,
              public datepipe: DatePipe) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.ev_id = this.route.snapshot.params['id'];
    this.dangKiCTV.event_ID=this.ev_id;
    //Loading
    this.reloadSK(this.ev_id);
      this.sukienService.CheckSoLuong(this.dangKiCTV).subscribe(data=>{
        if(this.sukien.number_of_collaborators>0 && data != this.sukien.number_of_collaborators){
          this.checkCTV=true;
        };
      });
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data => {
      this.users = data;
      this.id = this.users.id;
    });
  }

  reloadSK(id:number){
    this.sukienService.getSK(id).subscribe(data => {
      this.sukien = data;
    });
  }

  // @ts-ignore
  dangKi(id: number, idSK: number) {
    this.dK.acc_ID = id;
    this.dK.event_ID = idSK;
    this.sukienService.CheckSoLuongNTG(this.dK).subscribe(data=>{
      if(data == this.sukien.number_of_peoples){
        this.toastr.warning("Sự kiện đã đủ người tham gia!");
      } else {
        this.sukienService.kiemTraThoiGian(this.dK).subscribe(data=>{
          for(var val of data){
            // @ts-ignore
            if(this.datepipe.transform(this.sukien.time_of_event,'yyyy-MM-dd h:mm a')==this.datepipe.transform(val,'yyyy-MM-dd h:mm a')){
              this.checkThoiGian++;
            }
          }
          if(!this.users.is_Update){
            this.toastr.warning("Bạn phải cập nhật thông tin cá nhân để thực hiện tính năng này!");
          } else {
            this.sukienService.kiemTraTG(this.dK).subscribe(data => {
              if (data != 0) {
                this.toastr.warning("Bạn đã đăng kí tham gia sự kiện này rồi!");
              } else
              {
                if(this.checkThoiGian>0){
                  this.toastr.error("Sự kiện này trùng thời gian với sự kiện mà bạn đã đăng kí!")
                } else {
                  this.sukienService.dangKi(this.dK).subscribe(data=>{
                    this.toastr.success("Bạn đã đăng kí tham gia thành công!",'',{timeOut:5000});
                  });
                }
              }
            });
          }
        });
      }
    });
  }

  updatesk(id: number) {
    this.dangKiCTV.user_ID = this.id;
    this.dangKiCTV.event_ID = id;
    this.sukienService.kiemTraThoiGianCTV(this.dangKiCTV).subscribe(data=>{
      for(var val of data){
        // @ts-ignore
        if(this.datepipe.transform(this.sukien.time_of_event,'yyyy-MM-dd h:mm a')==this.datepipe.transform(val,'yyyy-MM-dd')){
          this.checkThoiGian++;
        }
      }
        if(!this.users.is_Update){
      this.toastr.warning("Bạn phải cập nhật thông tin cá nhân để thực hiện tính năng này!");
    } else {
      this.dangkiCTVSV.check(this.dangKiCTV).subscribe(data => {
        if (data != 0) {
          this.toastr.warning("Bạn đã đăng kí cộng tác viên cho sự kiện này rồi!");
        } else if(this.checkThoiGian>0){
          this.toastr.error("Sự kiện này trùng thời gian với sự kiện mà bạn đã đăng kí!")
        } else {
          this.router.navigate(['/dangkicongtacvien', id]).then(() => {
            window.scrollTo(0,0)
          });
        }
      });
    }
    });
  }

  reloadData() {
    this.sukienService.findSKDD().subscribe(data => {
      this.suKiens = data;
    })
  }

  detailSK(id: number) {
    this.reloadSK(id);
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0);
      window.location.reload();
    })
  }
}
