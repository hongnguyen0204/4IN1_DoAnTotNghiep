import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {scan} from 'rxjs/operators';

@Component({
  selector: 'app-kiemtrave',
  templateUrl: './kiemtrave.component.html',
  styleUrls: ['./kiemtrave.component.scss'],
  providers: [SukienService]
})
export class KiemtraveComponent implements OnInit {
  // @ts-ignore
  constructor(private sukienService: SukienService) { }

  ngOnInit(): void {
    this.funcv();
  }
  // @ts-ignore
  funcv(){
    // @ts-ignore
    const scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    // @ts-ignore
    scanner.addListener('scan', function(content) {
        alert(content);
    });
    // @ts-ignore
    // @ts-ignore
    Instascan.Camera.getCameras().then(function(cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
      // @ts-ignore
    }).catch(function(e) {
      console.error(e);
    });
  }
// @ts-ignore
  kiemtra(){
    alert();
    // this.sukienService.CheckVe(this.funcv()).subscribe(data => {
    //   if (data){
    //     alert('Hợp lệ');
    //   }else{
    //     alert('Không hợp lệ');
    //   }
    // });
  }
}
