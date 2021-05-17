import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Sukien} from '../../Model/sukien';
import {SukienService} from '../../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {ThongbaoService} from '../../_services/thongbao.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss'],
  providers:[SukienService]
})
export class ThongkeComponent implements OnInit {
  // @ts-ignore
  @ViewChild('appendTo', { read: ViewContainerRef }) public appendTo: ViewContainerRef;
  // @ts-ignore
  id:number;
  // @ts-ignore
  id_admin:number;
  sukien:Sukien=new Sukien();
  constructor(private skService: SukienService,private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id_admin=this.tokenStorageService.getUser().id;
    this.id=this.route.snapshot.params['id'];
    this.skService.getSK(this.id).subscribe(data=>{
      this.sukien=data;
    },error => console.log(error));
  }
  updateStudent(){
    this.sukien.id_cencor=this.id_admin;
    this.skService.update(this.id,this.sukien).subscribe(data=>{
      this.router.navigate(['admin/sukien']) .then(() => {
        window.location.reload();
        this.toastr.success("Duyệt thành công!");
      });
    },error => console.log(error));
  }
  cancelStudent(){
    this.sukien.id_cencor=this.id_admin;
    this.skService.cancel(this.id,this.sukien).subscribe(data=>{
      this.router.navigate(['admin/sukien']) .then(() => {
        this.toastr.warning("Đã hủy sự kiện!");
        window.location.reload();
      });
    },error => console.log(error));
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
