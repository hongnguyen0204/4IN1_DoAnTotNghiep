import { Component, OnInit } from '@angular/core';
import {Quanlytintuc} from '../Model/quanlytintuc';
import {QuanlytintucserviceService} from '../Service/quanlytintucservice.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-chitiettintuc',
  templateUrl: './chitiettintuc.component.html',
  styleUrls: ['./chitiettintuc.component.scss'],
  providers: [QuanlytintucserviceService],
})
export class ChitiettintucComponent implements OnInit {
  // @ts-ignore
  tt_id:number;
  currentUser: any;
  tintuc : any;
  // @ts-ignore
  tintucs: Quanlytintuc[];
  constructor(private  quanLyTinTucService : QuanlytintucserviceService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.tt_id=this.route.snapshot.params['id'];
    this.reload(this.tt_id);
    this.quanLyTinTucService.findAll().subscribe(data=>{
      this.tintucs=data;
    },error => console.log(error));
  }

  reload(tt:number){
  this.quanLyTinTucService.get(tt).subscribe(data=>{
    this.tintuc=data;
  },error => console.log(error));
}
  detailTT(id:number){
    // @ts-ignore
    this.tt_id=id;
    this.reload(this.tt_id);
    this.router.navigate(['chitiettintuc', id]).then(() => {
      window.scrollTo(0,0)
    });

  }

}
