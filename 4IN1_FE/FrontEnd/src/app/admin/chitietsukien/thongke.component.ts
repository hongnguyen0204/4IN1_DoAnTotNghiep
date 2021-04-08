import { Component, OnInit } from '@angular/core';
import {Sukien} from '../../Model/sukien';
import {SukienService} from '../../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss'],
  providers:[SukienService]
})
export class ThongkeComponent implements OnInit {
  // @ts-ignore
  id:number;
  sukien:Sukien=new Sukien();
  constructor(private skService: SukienService,private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.skService.get(this.id).subscribe(data=>{
      this.sukien=data;
    },error => console.log(error));
  }
  updateStudent(){
    this.skService.update(this.id,this.sukien).subscribe(data=>{
      console.log(data);
      this.router.navigate(['admin/sukien']);
    },error => console.log(error));
  }
  cancelStudent(){
    this.skService.cancel(this.id,this.sukien).subscribe(data=>{
      console.log(data);
      this.router.navigate(['admin/sukien']);
    },error => console.log(error));
  }
}
