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
  // @ts-ignore
  id:string;
  // @ts-ignore
  sukien : Sukien;

  constructor(private sukienService: SukienService, private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage
               ) { }

  ngOnInit(): void {
    this.sukien = new Sukien();
  }

  save(event:any) {
    this.selectedImage = event.target.files[0];
    const name = this.selectedImage.name;
    const fileRef = this.storage.ref(name);
    this.storage.upload(name, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.id = url;
          console.log(this.id);
        });
      })).subscribe();
  }

  add(){
    console.log(this.id);
    this.sukien.plan_file=this.id;
    if(confirm("Bạn chắc chắn muốn đăng kí hay không?")){
      this.sukienService.create(this.sukien).subscribe(data=>{
        this.sukien = data;
        alert("Đăng kí thành công");
        this.router.navigate(['/dangkitochuc']);
      });
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

