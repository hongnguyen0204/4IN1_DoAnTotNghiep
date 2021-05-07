// @ts-ignore
import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {QuanlytintucserviceService} from "../../Service/quanlytintucservice.service";
import {Quanlytintuc} from "../../Model/quanlytintuc";
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {TokenStorageService} from '../../_services/token-storage.service';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../-helpers/confirm-dialog/confirm-dialog.component';


// @ts-ignore
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.scss'],
  providers:[QuanlytintucserviceService, DatePipe]
})
export class TintucComponent implements OnInit,OnDestroy {
  // @ts-ignore
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  // @ts-ignore
  quanlytintucs: Quanlytintuc[];
  // @ts-ignore


  constructor(private quanLyTinTucService: QuanlytintucserviceService,
              private route: ActivatedRoute,
              private router: Router,
              public datepipe: DatePipe,
              private tokenStorageService: TokenStorageService,
              private dialog: MatDialog) {
      }

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers'
    };
    this.reloadData();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  reloadData() {
    // @ts-ignore
    this.quanLyTinTucService.findAll().subscribe(data => {
      this.quanlytintucs = data;
      this.dtTrigger.next();
    });
  }

  delete(id: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Xóa',
        message: 'Bạn có chắc chắn muốn xóa hay không?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
    this.quanLyTinTucService.delete(id)
      .subscribe(
        data => {
          window.location.reload();
        },
        error => console.log(error));
  }
    });
  }

  updateTinTuc(id: number){
    this.router.navigate(['/admin/suatintuc',id]);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
