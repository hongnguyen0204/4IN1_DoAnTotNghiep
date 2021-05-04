import {Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {Sukien} from '../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ThongbaoService} from '../_services/thongbao.service';
import {ToastrService} from 'ngx-toastr';
import {Dangkilamctv} from '../Model/dangkilamctv';
import {DangkilamctvService} from '../Service/dangkilamctv.service';

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
  id: number;
  // @ts-ignore
  dangKiCTV: Dangkilamctv = new Dangkilamctv();

  constructor(private sukienService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private token: TokenStorageService,
              private toastr: ToastrService,
              private dangkiCTVSV: DangkilamctvService) {
  }

  ngOnInit(): void {
    this.reloadData();
    this.ev_id = this.route.snapshot.params['id'];
    console.log(this.ev_id);
    this.sukienService.getSK(this.ev_id).subscribe(data => {
      this.sukien = data;
    }, error => console.log(error));

    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data => {
      this.users = data;
      this.id = this.users.id;
      console.log(this.id);
    });
  }

  // @ts-ignore
  dangKi(id: number, idSK: number) {
    this.dK.acc_ID = id;
    this.dK.event_ID = idSK;
    this.sukienService.kiemTraTG(this.dK).subscribe(data => {
      if (data != 0) {
        this.toastr.warning("Bạn đã đăng kí tham gia sự kiện này rồi!");
      } else {
        this.sukienService.dangKi(this.dK).subscribe();
        this.router.navigate(['quanlysukien']).then(() => {
          window.location.reload();
        });
      }
    })
  }

  updatesk(id: number) {
    this.dangKiCTV.user_ID = this.id;
    this.dangKiCTV.event_ID = id;
    this.dangkiCTVSV.check(this.dangKiCTV).subscribe(data => {
      if (data != 0) {
        this.toastr.warning("Bạn đã đăng kí cộng tác viên cho sự kiện này rồi!");
      } else {
        this.router.navigate(['/dangkicongtacvien', id]);
      }
    });
  }

  reloadData() {
    this.sukienService.findSKDD().subscribe(data => {
      this.suKiens = data;
    })
  }

  detailSK(id: number) {
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.location.reload();
    })
  }
}
