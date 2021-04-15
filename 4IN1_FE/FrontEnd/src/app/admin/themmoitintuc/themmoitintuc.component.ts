import {Component, Inject, OnInit} from '@angular/core';
import {QuanlytintucserviceService} from "../../Service/quanlytintucservice.service";
import {Quanlytintuc} from "../../Model/quanlytintuc";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {TokenStorageService} from '../../_services/token-storage.service';
import {Thongtincanhan} from '../../Model/thongtincanhan';
import {AccountService} from '../../Service/account.service';

@Component({
  selector: 'app-themmoitintuc',
  templateUrl: './themmoitintuc.component.html',
  styleUrls: ['./themmoitintuc.component.scss'],
  providers:[QuanlytintucserviceService]
})
export class ThemmoitintucComponent implements OnInit {

  // @ts-ignore
  selectedImage: any = null;
  // @ts-ignore
  tintuc :Quanlytintuc;
  // @ts-ignore
  imageSrc: string;
  // @ts-ignore
  id: string;
  // @ts-ignore
  admin_id:number;
  currentUser: any;
  users:Thongtincanhan=new Thongtincanhan();

  constructor(private quanLyTinTucService: QuanlytintucserviceService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private accountService:AccountService) { }

  ngOnInit(): void {
    this.tintuc = new Quanlytintuc();
    this.currentUser = this.tokenStorageService.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data=>{
      this.users=data;
      this.admin_id=this.users.id;
    });
  }

  save(event:any) {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.id = url;
          this.tintuc.img = this.id;
          this.tintuc.ID_admin=this.admin_id;
          if (confirm("Bạn chắc chắn muốn thêm hay không?")) {
            this.quanLyTinTucService.create(this.tintuc).subscribe(data => {
              this.tintuc = data;
              alert("Thêm thành công");
              this.router.navigate(['/admin/tintuc']).then(() => {
                window.location.reload();
              });
            });
          }
        });
      })).subscribe();
  }

  // tslint:disable-next-line:typedef
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

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
