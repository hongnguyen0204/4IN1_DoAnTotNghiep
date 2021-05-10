import { Component, OnInit } from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';
import {Thongtincanhan} from '../Model/thongtincanhan';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.component.html',
  styleUrls: ['./quenmatkhau.component.scss'],
  providers: [QuenmatkhauService]
})
export class QuenmatkhauComponent implements OnInit {
  account: Thongtincanhan = new Thongtincanhan();
  form: any = {};
  isSuccessful= false;
  // @ts-ignore
  email: string;
  // @ts-ignore
  kiemtra=true;
  constructor(private quenmatkhauservice: QuenmatkhauService) { }

  ngOnInit(): void {
  }

  laymatkhauquaemail(email: string){
    this.quenmatkhauservice.findUserbyemail(email).subscribe(data=>{
      this.account = data;
      if(this.account == null){
        this.isSuccessful = false;
        this.kiemtra = false;
      }else{
        this.kiemtra = true;
        this.quenmatkhauservice.laymatkhauquaemail(email).subscribe();
        this.isSuccessful = true;
      }
    });
  }
}
