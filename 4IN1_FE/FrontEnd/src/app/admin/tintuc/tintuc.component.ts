// @ts-ignore
import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuanlytintucserviceService} from "../../Service/quanlytintucservice.service";
import {Quanlytintuc} from "../../Model/quanlytintuc";
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from "@angular/common";
import {TokenStorageService} from '../../_services/token-storage.service';
import {Subject} from 'rxjs';


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
              private tokenStorageService: TokenStorageService) {
      }

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5
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
    this.quanLyTinTucService.delete(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateTinTuc(id: number){
    this.router.navigate(['/admin/suatintuc',id]);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
