import {Component, OnDestroy, OnInit} from '@angular/core';
import {SukienService} from '../../Service/sukien.service';
import {Sukien} from '../../Model/sukien';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../_services/token-storage.service';
import {Subject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../-helpers/confirm-dialog/confirm-dialog.component';

class DataTablesResponse {
  // @ts-ignore
  data: any[];
  // @ts-ignore
  draw: number;
  // @ts-ignore
  recordsFiltered: number;
  // @ts-ignore
  recordsTotal: number;
}

@Component({
  selector: 'app-sukien',
  templateUrl: './sukien.component.html',
  styleUrls: ['./sukien.component.scss'],
  providers:[SukienService]
})
export class SukienComponent implements OnInit,OnDestroy {
  // @ts-ignore
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger1: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();
  dtTrigger3: Subject<any> = new Subject<any>();
  // @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  sukienDD: Sukien[];
  // @ts-ignore
  sukienDH: Sukien[];
  // @ts-ignore
  sukiensapdienra:Sukien[];
  checkHot=false;
  constructor(private skService:SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService,
              private dialog: MatDialog
             ) {
  }

  ngOnInit(): void {
    this.skService.findByhot().subscribe(data=>{
      if(data!=null){
        this.checkHot=true;
      }
    });
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
    };
    this.skService.findAll().subscribe(data=>{
      this.sukien=data;
      this.dtTrigger.next();
    });
    this.skService.findSKDDFull().subscribe(data=>{
      this.sukienDD=data;
      this.dtTrigger1.next();
    });
    this.skService.findSKDH().subscribe(data=>{
      this.sukienDH=data;
      this.dtTrigger2.next();
    });
    this.skService.findSKDD().subscribe(data=>{
      this.sukiensapdienra=data;
      this.dtTrigger3.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
    this.dtTrigger3.unsubscribe();
  }

  SetSKHot(id:number,sk:any){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'HOT',
        message: 'Bạn có chắc chắn muốn đặt Hot cho sự kiện này không?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.skService.setHot(id,sk).subscribe(data=>{
          this.router.navigate(['admin/sukien']) .then(() => {
            window.location.reload();
            this.toastr.success("Đặt Hot thành công!");
          });
        },error => console.log(error));
      }
    });
  }

  HuySKHot(id:number,sk:any){
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Hủy HOT',
        message: 'Bạn có chắc chắn muốn Hủy Hot cho sự kiện này không?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.skService.HuyHot(id,sk).subscribe(data=>{
          this.router.navigate(['admin/sukien']) .then(() => {
            window.location.reload();
            this.toastr.success("Đã hủy Hot!");
          });
        },error => console.log(error));
      }
    });
  }


  details(id: number){
    this.router.navigate(['admin/chitietsukien',id]).then(() => {
      window.scrollTo(0,0)
    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
