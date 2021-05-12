import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kiemtrave',
  templateUrl: './kiemtrave.component.html',
  styleUrls: ['./kiemtrave.component.scss']
})
export class KiemtraveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // @ts-ignore
  kiemtra(){
    // @ts-ignore
    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    // @ts-ignore
    scanner.addListener('scan', function (content) {
      alert(content);
    });
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
}
