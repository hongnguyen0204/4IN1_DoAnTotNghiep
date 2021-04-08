import { Component, OnInit } from '@angular/core';
import {QuanlytintucserviceService} from "../../Service/quanlytintucservice.service";
import {Quanlytintuc} from "../../Model/quanlytintuc";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-themmoitintuc',
  templateUrl: './themmoitintuc.component.html',
  styleUrls: ['./themmoitintuc.component.scss'],
  providers:[QuanlytintucserviceService]
})
export class ThemmoitintucComponent implements OnInit {
// @ts-ignore
  tintuc :Quanlytintuc;
  // @ts-ignore
  imageSrc: string;
  constructor(private quanLyTinTucService: QuanlytintucserviceService,private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.tintuc = new Quanlytintuc();
  }
  add(){
    this.quanLyTinTucService.create(this.tintuc)
      .subscribe(
        response => {
           console.log(this.tintuc.title);
          this.router.navigate(['/list']);
        },
        error => {
          console.log(error);
        });
  }
  // tslint:disable-next-line:typedef
  readURL(event: Event): void {
    // @ts-ignore
    if (event.target.files && event.target.files[0]) {
      // @ts-ignore
      const file = event.target.files[0];
      const reader = new FileReader();
      // @ts-ignore
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }
}
