import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-themmoitintuc',
  templateUrl: './themmoitintuc.component.html',
  styleUrls: ['./themmoitintuc.component.scss']
})
export class ThemmoitintucComponent implements OnInit {
// @ts-ignore
  imageSrc: string;
  constructor() { }

  ngOnInit(): void {
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
