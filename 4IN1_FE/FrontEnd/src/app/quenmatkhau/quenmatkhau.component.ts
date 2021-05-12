import { Component, OnInit } from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.component.html',
  styleUrls: ['./quenmatkhau.component.scss'],
  providers: [QuenmatkhauService]
})
export class QuenmatkhauComponent implements OnInit {

  funcv(){
    // @ts-ignore
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    // @ts-ignore
    scanner.addListener('scan', function (content) {
      alert(content);
    });
    // @ts-ignore
    // @ts-ignore
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
      // @ts-ignore
    }).catch(function (e) {
      console.error(e);
    });
  }
  account: Thongtincanhan = new Thongtincanhan();
  form: any = {};
  isSuccessful= false;
  // @ts-ignore
  email: string;
  // @ts-ignore
  kiemtra=true;
  constructor(private quenmatkhauservice: QuenmatkhauService) { }

  ngOnInit(): void {
    this.funcv();
  }

  laymatkhauquaemail(email: string){
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 8a603050f8056774f64fc5ed79dc23390326c148
    this.quenmatkhauservice.findUserbyemail(email).subscribe(data=>{
      this.account = data;
      if(this.account == null){
        this.isSuccessful = false;
        this.kiemtra = false;
      }else{
        this.kiemtra = true;
        this.quenmatkhauservice.laymatkhauquaemail(email).subscribe();
        this.isSuccessful = true;
      }
    });
<<<<<<< HEAD
    this.quenmatkhauservice.laymatkhauquaemail(email).subscribe();
    alert("Gửi thành công, vào mail để check!")
=======
=======
    this.quenmatkhauservice.laymatkhauquaemail(email).subscribe();
    alert("Gửi thành công, vào mail để check!")
>>>>>>> e9d1344cca0773e9561a3f518f8f366b5d34401f
>>>>>>> 8a603050f8056774f64fc5ed79dc23390326c148
  }
}
