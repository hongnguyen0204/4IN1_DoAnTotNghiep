import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {scan} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-kiemtrave',
  templateUrl: './kiemtrave.component.html',
  styleUrls: ['./kiemtrave.component.scss'],
  providers: [SukienService]
})
export class KiemtraveComponent implements OnInit,AfterViewInit {
  isSuccessful= false;
  // @ts-ignore
  ev_id: number;
  // @ts-ignore
  @ViewChild('hiddenInput1') hiddenInput1:ElementRef;
  ngAfterViewInit() {
    // @ts-ignore
    $(this.hiddenInput1.nativeElement).on('change', (e) => {
      // @ts-ignore
      this.mave =  window.sessionStorage.getItem('code');
      console.log(this.mave);
      // @ts-ignore
      this.sukienService.CheckVe(this.mave, this.ev_id).subscribe(data=>{
        console.log(data);
          if(data == 1) {
            this.toastr.warning("Vé đã được quét!");
          }else if(data == 2){
            this.toastr.success("Vé Hợp lệ");
          }else{
            this.toastr.error("Vé Không hợp lệ");
          }
      });
    });
  }
  // @ts-ignore
  constructor(private sukienService: SukienService, private toastr: ToastrService, private route: ActivatedRoute) { }
  // @ts-ignore
  mave:string;
  ngOnInit(): void {
    this.ev_id = this.route.snapshot.params['id'];
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
