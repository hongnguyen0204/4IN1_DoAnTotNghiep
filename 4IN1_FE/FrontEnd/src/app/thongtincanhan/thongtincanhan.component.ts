import {Component, Inject, OnInit} from '@angular/core';
import {ThongtincanhanService} from '../Service/thongtincanhan.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../-helpers/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-thongtincanhan',
  templateUrl: './thongtincanhan.component.html',
  styleUrls: ['./thongtincanhan.component.scss'],
  providers: [ThongtincanhanService, AccountService]
})
export class ThongtincanhanComponent implements OnInit {
// @ts-ignore
  selectedImage: any = null;
  // @ts-ignore
  imageSrc: string;
  // @ts-ignore
  id: number;
  currentUser: any;
  // @ts-ignore
  users: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  gender: string;
  constructor(private thongtincanhanService: ThongtincanhanService,
              @Inject(AngularFireStorage)
              private storage: AngularFireStorage,
              private router: Router,
              private route: ActivatedRoute,
              private accountService: AccountService,
              private token: TokenStorageService,
              private toast: ToastrService,
              private dialog: MatDialog) {
  }

  // @ts-ignore

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data => {
      this.users = data;
      if (this.users.faculty == null) {
        this.users.faculty = "Chọn khoa";
      }
      this.imageSrc = this.users.img;
      this.id = this.users.id;
    });
  }

  // tslint:disable-next-line:typedef
  save(event: any) {
    // @ts-ignore
    this.users.day_of_birth = document.getElementById("date").value;
    if(this.checkDateOfBirth(this.users.day_of_birth)){
      // @ts-ignore
      this.users.gender = document.querySelector('input[name="gender"]:checked').value;
      if (this.selectedImage) {
        const name = this.selectedImage.name;
        const fileRef = this.storage.ref(name);
        this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              if (this.users.img != url) {
                this.users.img = url;
              }
              const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
                data: {
                  title: 'Sửa thông tin',
                  message: 'Bạn chắc chắn muốn sửa hay không?'
                }
              });
              confirmDialog.afterClosed().subscribe(result => {
                if (result === true) {
                  this.thongtincanhanService.update(this.id, this.users).subscribe(data => {
                    this.users = data;
                    window.location.reload();
                    this.toast.success("Sửa thành công");
                  });
                }
              });
            });
          })).subscribe();
      } else {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
          data: {
            title: 'Sửa thông tin',
            message: 'Bạn chắc chắn muốn sửa hay không?'
          }
        });
        confirmDialog.afterClosed().subscribe(result => {
          if (result === true) {
            this.thongtincanhanService.update(this.id, this.users).subscribe(data => {
              this.users = data;
              window.location.reload();
              this.toast.success("Sửa thành công");
            });
          }
        });
      }
    }
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
   // @ts-ignore
  dateDiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

   checkDateOfBirth(dateOfBirth:any) {
    if (this.dateDiff(new Date(dateOfBirth), new Date()) > 6205 ) {
      return true;
    } else {
      return false;
    }
  }
}
