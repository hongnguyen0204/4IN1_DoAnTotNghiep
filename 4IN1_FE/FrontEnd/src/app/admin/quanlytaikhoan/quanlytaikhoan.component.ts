import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {AccountService} from '../../Service/account.service';
import {ToastrService} from 'ngx-toastr';
import {Router, RouterModule} from '@angular/router';
import {Thongtincanhan} from '../../Model/thongtincanhan';
import {LoadService} from '../../_services/load.service';

@Component({
  selector: 'app-quanlytaikhoan',
  templateUrl: './quanlytaikhoan.component.html',
  styleUrls: ['./quanlytaikhoan.component.scss']
})
export class QuanlytaikhoanComponent implements OnInit {

  // @ts-ignore
  dtOptions: { pagingType: string };
  // @ts-ignore
  listAcc:Thongtincanhan[];
  constructor(private tokenStorageService: TokenStorageService,
              private accountService:AccountService,
              private toastr:ToastrService,
              private router:Router,
              private load:LoadService) {
    this.load.loadScript("node_modules/jquery/dist/jquery.js/jquery.min.js");  }

  ngOnInit(): void {
    this.accountService.findAll().subscribe(data => {
      this.listAcc = data;
    });
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
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
