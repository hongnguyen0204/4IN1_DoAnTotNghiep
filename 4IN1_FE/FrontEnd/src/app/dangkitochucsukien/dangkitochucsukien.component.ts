import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-dangkitochucsukien',
  templateUrl: './dangkitochucsukien.component.html',
  styleUrls: ['./dangkitochucsukien.component.scss']
})

export class DangkitochucsukienComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  kiemtra(){
    if ($('#radio_1').prop('checked')){
      $('#congtac').css('display', 'block');
    } else
    if ($('#radio_2').prop('checked')){
      $('#congtac').css('display', 'none');
    }
  }
}

