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
      if(this.sukien.number_of_peoples!=0 && data == this.sukien.number_of_peoples){
        this.toastr.warning("S??? ki???n ???? ????? ng?????i tham gia!");
      } else {
        this.sukienService.kiemTraThoiGian(this.dK).subscribe(data=>{
          for(var val of data){
            // @ts-ignore
            if(this.datepipe.transform(this.sukien.time_of_event,'yyyy-MM-dd h:mm a')==this.datepipe.transform(val,'yyyy-MM-dd h:mm a')){
              this.checkThoiGian++;
            }
          }
          if(!this.users.is_Update){
            this.toastr.warning("B???n ph???i c???p nh???t th??ng tin c?? nh??n ????? th???c hi???n t??nh n??ng n??y!");
          } else {
            this.sukienService.kiemTraTG(this.dK).subscribe(data => {
              if (data != 0) {
                this.toastr.warning("B???n ???? ????ng k?? tham gia s??? ki???n n??y r???i!");
              } else
              {
                if(this.checkThoiGian>0){
                  this.toastr.error("S??? ki???n n??y tr??ng th???i gian v???i s??? ki???n m?? b???n ???? ????ng k??!")
                } else {
                  this.toastr.success("B???n ???? ????ng k?? tham gia th??nh c??ng! V?? ???? ???????c g???i v??o email c???a b???n.",'',{timeOut:5000});
                  this.sukienService.dangKi(this.dK).subscribe(data=>{

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
      this.toastr.warning("B???n ph???i c???p nh???t th??ng tin c?? nh??n ????? th???c hi???n t??nh n??ng n??y!");
    } else {
      this.dangkiCTVSV.check(this.dangKiCTV).subscribe(data => {
        if (data != 0) {
          this.toastr.warning("B???n ???? ????ng k?? c???ng t??c vi??n cho s??? ki???n n??y r???i!");
        } else if(this.checkThoiGian>0){
          this.toastr.error("S??? ki???n n??y tr??ng th???i gian v???i s??? ki???n m?? b???n ???? ????ng k??!")
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
