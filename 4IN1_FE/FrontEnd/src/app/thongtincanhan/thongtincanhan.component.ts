import {Component, Inject, OnInit} from '@angular/core';
import {ThongtincanhanService} from '../Service/thongtincanhan.service';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {AngularFireStorage} from '@angular/fire/storage';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from 'rxjs/operators';
import {Quanlytintuc} from "../Model/quanlytintuc";
import {QuanlytintucserviceService} from "../Service/quanlytintucservice.service";

@Component({
  selector: 'app-thongtincanhan',
  templateUrl: './thongtincanhan.component.html',
  styleUrls: ['./thongtincanhan.component.scss'],
  providers:[ThongtincanhanService]
})
export class ThongtincanhanComponent implements OnInit {
// @ts-ignore
  selectedImage: any = null;
  // @ts-ignore
  ttcn: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  imageSrc: string;
  // @ts-ignore
  id: number;

  constructor(private thongtincanhanService: ThongtincanhanService,
              @Inject(AngularFireStorage)
              private storage: AngularFireStorage,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.id=1;
    this.thongtincanhanService.get(this.id).subscribe(data => {
      this.ttcn = data;
      // @ts-ignore
      this.imageSrc = this.ttcn.img;
    }, error => console.log(error));
  }

  save(event: any) {
    if (this.selectedImage) {
      const name = this.selectedImage.name;
      const fileRef = this.storage.ref(name);
      this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            if (this.ttcn.img != url) {
              this.ttcn.img = url;
              console.log(this.ttcn.img);
            }
            if (confirm("Bạn chắc chắn muốn sửa hay không?")) {
              this.thongtincanhanService.update(this.id, this.ttcn).subscribe(data => {
                this.ttcn = data;
                alert("Sửa thành công");
              });
            }
          });
        })).subscribe();
    } else {
      if (confirm("Bạn chắc chắn muốn sửa hay không?")) {
        this.thongtincanhanService.update(this.id, this.ttcn).subscribe(data => {
          this.ttcn = data;
          alert("Sửa thành công");
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

}
