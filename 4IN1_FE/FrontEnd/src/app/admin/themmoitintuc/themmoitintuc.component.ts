import {Component, Inject, OnInit} from '@angular/core';
import {QuanlytintucserviceService} from "../../Service/quanlytintucservice.service";
import {Quanlytintuc} from "../../Model/quanlytintuc";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";

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

  constructor(private quanLyTinTucService: QuanlytintucserviceService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router) { }

  ngOnInit(): void {
    this.tintuc = new Quanlytintuc();
  }

  save(event:any) {
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.id = url;
          this.tintuc.img = this.id;
          if (confirm("Bạn chắc chắn muốn thêm hay không?")) {
            this.quanLyTinTucService.create(this.tintuc).subscribe(data => {
              this.tintuc = data;
              alert("Thêm thành công");
              this.router.navigate(['/admin/tintuc']);
            });
          }
        });
      })).subscribe();
  }

  // add() {
  //   this.tintuc.img = this.id;
  //   if (confirm("Bạn chắc chắn muốn thêm hay không?")) {
  //     this.quanLyTinTucService.create(this.tintuc).subscribe(data => {
  //       this.tintuc = data;
  //       alert("Thêm thành công");
  //     });
  //   }
  //   this.router.navigate(['/admin/tintuc']);
  // }

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
}
