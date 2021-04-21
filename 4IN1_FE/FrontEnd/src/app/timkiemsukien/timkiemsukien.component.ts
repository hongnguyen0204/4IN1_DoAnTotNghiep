import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';

@Component({
  selector: 'app-timkiemsukien',
  templateUrl: './timkiemsukien.component.html',
  styleUrls: ['./timkiemsukien.component.scss'],
  providers: [SukienService]
})
export class TimkiemsukienComponent implements OnInit {
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  searchText;
  // @ts-ignore
  khoa;
  // @ts-ignore
  diadiem;
  // @ts-ignore
  start;
  // @ts-ignore
  end;
  constructor(private sukienService: SukienService) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.sukienService.findAllsk().subscribe(data => {
      this.sukiens = data;
    })
  }

}
