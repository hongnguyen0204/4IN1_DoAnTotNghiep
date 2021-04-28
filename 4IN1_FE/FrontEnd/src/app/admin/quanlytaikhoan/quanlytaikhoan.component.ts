import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AccountService} from '../../Service/account.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Thongtincanhan} from '../../Model/thongtincanhan';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-quanlytaikhoan',
  templateUrl: './quanlytaikhoan.component.html',
  styleUrls: ['./quanlytaikhoan.component.scss'],
  providers:[AccountService]
})
export class QuanlytaikhoanComponent implements OnInit,OnDestroy {

  // @ts-ignore
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // @ts-ignore
  listAcc:Thongtincanhan[];
  constructor(private tokenStorageService: TokenStorageService,
              private accountService:AccountService,
              private toastr:ToastrService,
              private router:Router
              ) {}

  ngOnInit(): void {
    this.accountService.findAll().subscribe(data => {
      this.listAcc = data;
      this.dtTrigger.next();
    });
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers'
    };
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  BanTK(id:number){
    this.accountService.banUser(id,"").subscribe(data=>{
      this.router.navigate(['admin/quanlytaikhoan']) .then(() => {
        window.location.reload();
        this.toastr.success("Đã cấm tài khoản!");
      });
    },error => console.log(error));
  }
}
