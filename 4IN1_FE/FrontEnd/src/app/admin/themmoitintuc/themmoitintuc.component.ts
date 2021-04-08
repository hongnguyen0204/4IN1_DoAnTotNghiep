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

  constructor(private quanLyTinTucService: QuanlytintucserviceService,private route: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private router: Router) { }

  ngOnInit(): void {
    this.tintuc = new Quanlytintuc();
  }

  save() {
    const name = this.selectedImage;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.id = url;
          this.tintuc.img = this.id;
          if (confirm("Bạn chắc chắn muốn đăng kí hay không?")) {
            this.quanLyTinTucService.create(this.tintuc);
              alert("Thêm thành công");
              this.router.navigate(['/tintuc']);
          }
        });
      })).subscribe();
  }

  add() {
    console.log(this.id);
    this.tintuc.img = this.id;
    if (confirm("Bạn chắc chắn muốn đăng kí hay không?")) {
      this.quanLyTinTucService.create(this.tintuc).subscribe(data => {
        this.tintuc = data;
        alert("Thêm thành công");
        this.router.navigate(['/tintuc']);
      });
    }
  }
  // tslint:disable-next-line:typedef
  readURL(event: Event): void {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];
      this.selectedImage = file.name;
      console.log(this.selectedImage);
      const reader = new FileReader();
      // @ts-ignore
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
