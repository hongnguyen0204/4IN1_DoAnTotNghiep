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

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService:AccountService,
              private token: TokenStorageService,
              private ctvService:DangkilamctvService) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5
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
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
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

}
