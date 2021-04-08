import {Component, Inject, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-dangkitochucsukien',
  templateUrl: './dangkitochucsukien.component.html',
  styleUrls: ['./dangkitochucsukien.component.scss'],
  providers: [SukienService]
})
export class DangkitochucsukienComponent implements OnInit {

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


  constructor(private sukienService: SukienService, private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
               ) { }

  ngOnInit(): void {
    this.sukien = new Sukien();
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
    this.sukien.plan_file=this.id;
    this.sukien.img=this.idIMG;
    if(confirm("Bạn chắc chắn muốn đăng kí hay không?")){
      this.sukienService.create(this.sukien).subscribe(data=>{
        this.sukien = data;
        alert("Đăng kí thành công");
        this.router.navigate(['/dangkitochuc']);
      });
    }
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

