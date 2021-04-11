import { Component, OnInit } from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sukiencuatoi',
  templateUrl: './sukiencuatoi.component.html',
  styleUrls: ['./sukiencuatoi.component.scss'],
  providers:[SukienService]
})
export class SukiencuatoiComponent implements OnInit {
// @ts-ignore
  dtOptions: { pagingType: string };

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
}
