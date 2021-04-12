import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-timkiemsukien',
  templateUrl: './timkiemsukien.component.html',
  styleUrls: ['./timkiemsukien.component.scss'],
  providers: [SukienService]
})
export class TimkiemsukienComponent implements OnInit {
// @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  namevent: any;
  // @ts-ignore
  constructor(private sukienService: SukienService,private router:Router, public rs: RestService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.rs.findAll().subscribe((response) =>{
      this.sukien = response;
    });
  }

  Search(){
    if(this.namevent == ""){
      this.ngOnInit();
    }else{
      this.sukien = this.sukien.filter(res =>{
        // @ts-ignore
        return res.namevent.toLocaleLowerCase().match(this.namevent.toLocaleLowerCase());
      });
    }
  }


}
