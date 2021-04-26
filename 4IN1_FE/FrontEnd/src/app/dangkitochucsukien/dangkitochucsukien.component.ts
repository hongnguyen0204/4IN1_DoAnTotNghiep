import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import * as $ from 'jquery';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from '../_services/token-storage.service';
import {AccountService} from '../Service/account.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {ThongbaoService} from '../_services/thongbao.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dangkitochucsukien',
  templateUrl: './dangkitochucsukien.component.html',
  styleUrls: ['./dangkitochucsukien.component.scss'],
  providers: [SukienService,AccountService]
})
export class DangkitochucsukienComponent implements OnInit {
// @ts-ignore
  currentUser: any;
  selectedImage: any = null;
  selectedFile: any = null;
  // @ts-ignore
  id:string;
  // @ts-ignore
  idIMG:string;
  // @ts-ignore
  sukien : Sukien;
  // @ts-ignore
  imageSrc: string;
  // @ts-ignore
  users:Thongtincanhan;
  // @ts-ignore
  check_Date=new Date();
  // @ts-ignore
  localCompleteDate: string;

  constructor(private sukienService: SukienService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private token: TokenStorageService,
              private accountService:AccountService,
              private toastr: ToastrService) {
    this.check_Date.setSeconds(0);
    this.check_Date.setMilliseconds(0);
    this.localCompleteDate = this.check_Date.toISOString();
    this.localCompleteDate = this.localCompleteDate.substring(0, this.localCompleteDate.length - 1);
  }

  ngOnInit(): void {
    this.sukien = new Sukien();
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
    })
  }

  save(event:any) {
    this.selectedFile = event.target.files[0];
    const name = this.selectedFile.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.id = url;
        });
      })).subscribe();
  }

  saveimg(event:any) {
    this.selectedImage = event.target.files[0];
    const nameimg = this.selectedImage.name;
    const fileRef = this.storage.ref(nameimg);
    this.storage.upload(nameimg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.idIMG = url;
        });
      })).subscribe();
  }

  add(){
    this.sukienService.kiemTra(this.sukien).subscribe(data=>{
      if(data!=0){
        this.toastr.error("Sự kiện của bạn trùng lịch với sự kiện khác sắp diễn ra!");
      } else {
        this.sukien.plan_file=this.id;
        this.sukien.img=this.idIMG;
        this.sukien.owner_event_id=this.users.id;
        this.sukien.organizer=this.users.fullname;
        if(confirm("Bạn chắc chắn muốn đăng kí hay không?")){
          this.sukienService.create(this.sukien).subscribe(data=>{
            this.sukien = data;
            this.toastr.success("Đăng kí thành công");
            this.sukien = new Sukien();
            this.router.navigate(['/dangkitochuc']);
          });
        }
      }
    });
  }

  readURL(event: any): void {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      this.selectedImage = event.target.files[0];

      const reader = new FileReader();
      // @ts-ignore
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedImage);
    }
  }
  //Xem bạn có muốn tuyển cộng tác viên hay không
    kiemtra(){
    if ($('#radio_1').prop('checked')){
      $('#congtac').css('display', 'block');
    } else
    if ($('#radio_2').prop('checked')){
      $('#congtac').css('display', 'none');
    }
  }
}

