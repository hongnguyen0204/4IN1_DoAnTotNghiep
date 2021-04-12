import { Component, OnInit } from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Dangkithamgia} from '../Model/dangkithamgia';

@Component({
  selector: 'app-quanlysukien',
  templateUrl: './quanlysukien.component.html',
  styleUrls: ['./quanlysukien.component.scss'],
  providers:[SukienService]
})
export class QuanlysukienComponent implements OnInit {
  // @ts-ignore
  dtOptions: { pagingType: string };
  // @ts-ignore
  dangkithamgia:Dangkithamgia[];

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.skService.find(1).subscribe(data=>{
      this.dangkithamgia=data;
    });
  }

}
