import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {LoadService} from '../_services/load.service';
import {Subject} from 'rxjs';
import {DangkilamctvService} from '../Service/dangkilamctv.service';
import {Congtacvien} from '../Model/congtacvien';
import {Dangkilamctv} from '../Model/dangkilamctv';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-quanlysukien',
  templateUrl: './quanlysukien.component.html',
  styleUrls: ['./quanlysukien.component.scss'],
  providers:[SukienService]
})
export class QuanlysukienComponent implements OnInit,OnDestroy {
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  // @ts-ignore
  dangkithamgia:any;
  congtacviens:any;
  // @ts-ignore
  id: number;
  // @ts-ignore
  id_SK: number;
  currentUser: any;
  // @ts-ignore
  users: Thongtincanhan=new Thongtincanhan();
  // @ts-ignore
  infor : Dangkithamgia=new Dangkithamgia();
  ctv:Dangkilamctv=new Dangkilamctv();
  // @ts-ignore
  sukiens: Sukien[];
  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService,
              private token: TokenStorageService,
              private ctvService:DangkilamctvService,
              public datepipe: DatePipe,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]]
    };
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.id = this.users.id;
      this.skService.find(this.users.id).subscribe(data=>{
        this.dangkithamgia=data;
        this.dtTrigger.next();
      });
      this.ctvService.list(this.users.id).subscribe(data=>{
        this.congtacviens=data;
        this.dtTrigger1.next();
      });
      this.skService.getSKbyiduser(this.id).subscribe(data => {
        this.sukiens = data;
        this.dtTrigger2.next();
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  delete(id:number) {
    this.infor.acc_ID = this.id;
    this.infor.event_ID=id;
    this.skService.huyDangKi(this.infor).subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => console.log(error));
  }

  deleteCTV(id:number){
    this.ctv.user_ID = this.id;
    this.ctv.event_ID=id;
    this.skService.huyCTV(this.ctv).subscribe(
      data => {
        window.location.reload();
      },
      error => console.log(error));
  }

  soatve(id:number){
    this.router.navigate(['kiemtrave',id]).then(() => {
      window.scrollTo(0,0);
      window.location.reload();
    })
  }

  ktTime(time:Date):boolean{
    // @ts-ignore
    return this.datepipe.transform(time, 'yyyy-MM-dd h:mm a') < this.datepipe.transform(new Date(), 'yyyy-MM-dd h:mm a');
  }

  detailSK(id: number) {
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0);
      window.location.reload();
    })
  }
}
