import {Component, Inject, OnInit} from '@angular/core';
import {Quanlytintuc} from '../../Model/quanlytintuc';
import {QuanlytintucserviceService} from '../../Service/quanlytintucservice.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from '../../_services/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../-helpers/confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-suatintuc',
  templateUrl: './suatintuc.component.html',
  styleUrls: ['./suatintuc.component.scss'],
  providers:[QuanlytintucserviceService]
})
export class SuatintucComponent implements OnInit {
  // @ts-ignore
  selectedImage: any = null;
  // @ts-ignore
  tintuc: Quanlytintuc = new Quanlytintuc();
  // @ts-ignore
  imageSrc: string;
  // @ts-ignore
  id: number;

  constructor(private quanLyTinTucService: QuanlytintucserviceService,
              @Inject(AngularFireStorage)
              private storage: AngularFireStorage,
              private router: Router,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog,
              private toastr:ToastrService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.quanLyTinTucService.get(this.id).subscribe(data => {
      this.tintuc = data;
      // @ts-ignore
      this.imageSrc = this.tintuc.img;
    }, error => console.log(error));
  }

  save(event: any) {
    if (this.selectedImage) {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            if (this.tintuc.img != url) {
              this.tintuc.img = url;
            }
            const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Sửa',
                message: 'Bạn có chắc chắn muốn sửa hay không?'
              }
            });
            confirmDialog.afterClosed().subscribe(result => {
              if (result === true) {
                this.quanLyTinTucService.update(this.id, this.tintuc).subscribe(data => {
                  this.tintuc = data;
                  this.toastr.success("Sửa thành công!");
                  this.router.navigate(['/admin/tintuc']).then(() => {
                    window.location.reload();
                  });
                });
              }
            });
          });
        })).subscribe();
    } else {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Sửa',
          message: 'Bạn có chắc chắn muốn sửa hay không?'
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.quanLyTinTucService.update(this.id, this.tintuc).subscribe(data => {
            this.tintuc = data;
            this.toastr.success("Sửa thành công!");
            this.router.navigate(['/admin/tintuc']).then(() => {
              window.location.reload();
            });
          });
        }
      });
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
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
