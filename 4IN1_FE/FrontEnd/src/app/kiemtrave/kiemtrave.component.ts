import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {scan} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-kiemtrave',
  templateUrl: './kiemtrave.component.html',
  styleUrls: ['./kiemtrave.component.scss'],
  providers: [SukienService]
})
export class KiemtraveComponent implements OnInit,AfterViewInit {
  isSuccessful= false;
  // @ts-ignore
  @ViewChild('hiddenInput1') hiddenInput1:ElementRef;
  ngAfterViewInit() {
    // @ts-ignore
    $(this.hiddenInput1.nativeElement).on('change', (e) => {
      // @ts-ignore
      this.mave =  window.sessionStorage.getItem('code');
      console.log(this.mave);
      this.sukienService.CheckVe(this.mave).subscribe(data=>{
          if(data == "Vé hợp lệ"){
            // @ts-ignore
            this.toastr.success("Vé Hợp lệ");
          }else{
            this.toastr.error("Vé Không hợp lệ");
          }
      });
    });
  }
  // @ts-ignore
  constructor(private sukienService: SukienService, private toastr: ToastrService) { }
  // @ts-ignore
  mave:string;
  ngOnInit(): void {
    this.funcv();
  }


  funcv(){
    // @ts-ignore
    var scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
    // @ts-ignore
    scanner.addListener('scan', function(content) {
      Gui(content);
      $("#content").val(content).trigger('change');
      // @ts-ignore
    });
    // @ts-ignore
    function Gui(content){
      // @ts-ignore
      window.sessionStorage.setItem('code',content);
      // @ts-ignore
    }

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
}
