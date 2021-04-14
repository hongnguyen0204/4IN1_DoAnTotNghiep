import { Component, OnInit } from '@angular/core';
import {QuenmatkhauService} from '../Service/quenmatkhau.service';

@Component({
  selector: 'app-quenmatkhau',
  templateUrl: './quenmatkhau.component.html',
  styleUrls: ['./quenmatkhau.component.scss'],
  providers: [QuenmatkhauService]
})
export class QuenmatkhauComponent implements OnInit {
  // @ts-ignore
  email: string;
  constructor(private quenmatkhauservice: QuenmatkhauService) { }

  ngOnInit(): void {
  }

  laymatkhauquaemail(email: string){
    console.log(email);
    this.quenmatkhauservice.laymatkhauquaemail(email).subscribe();
    alert("Gửi thành công, vào mail để check!")
  }

}
