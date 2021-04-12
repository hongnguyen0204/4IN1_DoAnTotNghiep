import {Component, Inject, OnInit} from '@angular/core';
import {Thongtincanhan} from "../Model/thongtincanhan";
import {SukienService} from "../Service/sukien.service";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {TokenStorageService} from "../_services/token-storage.service";
import {AccountService} from "../Service/account.service";

@Component({
  selector: 'app-dangkilamcongtacvien',
  templateUrl: './dangkilamcongtacvien.component.html',
  styleUrls: ['./dangkilamcongtacvien.component.scss'],
  providers:[AccountService,SukienService]
})
export class DangkilamcongtacvienComponent implements OnInit {
  currentUser: any;
  // @ts-ignore
  id:string;
  // @ts-ignore
  users:Thongtincanhan;

  constructor(private sukienService: SukienService, private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private token: TokenStorageService,
              private accountService:AccountService) { }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
    })
  }
}
