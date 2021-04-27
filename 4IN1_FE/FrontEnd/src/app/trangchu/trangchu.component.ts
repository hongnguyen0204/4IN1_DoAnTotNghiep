import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';
import {Message} from '../Model/message';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  providers: [SukienService]
})
export class TrangchuComponent implements OnInit {
  message: Message = new Message();

  p: number =1;
  // @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  sukienhot:Sukien = new Sukien();
  m: Date = new Date();
  // @ts-ignore
  month:number = this.m.getMonth() + 1;
  // @ts-ignore
  constructor(private sukienService: SukienService,private router:Router) {
  }
  demo:any;
  x:any;
  countDownDate:any;

  ngOnInit(): void {
    this.month;
    this.dataMonth(this.month);
    // @ts-ignore
    this.datahot();
    // @ts-ignore
  }

  detailSK(id:number){
    this.router.navigate(['dangkithamgia',id]);
  }

  dataMonth(id:number){
    this.sukienService.findByMonth(id).subscribe(data=>{
      this.sukien=data;
    })
  }

  datahot(){
    // @ts-ignore
    this.sukienService.findByhot().subscribe(data=>{
      this.sukienhot=data;
      this.countDownDate = new Date(this.sukienhot.time_of_event).getTime();
      this.x= setInterval(()=>{
        var now = new Date().getTime();
        // @ts-ignore
        var distance = this.countDownDate - now;
        var days = Math.floor(distance/(1000*60*60*24));
        var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
        var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
        var seconds = Math.floor((distance % (1000*60)) / 1000);
        this.demo = days + "d " + hours + "h " +minutes +"m " +seconds + "s ";
        $("#days").html(days + "<span style='font-size: 30px; margin-top: -45px'>Days</span>");
        $("#hours").html(hours + "<span style='font-size: 30px; margin-top: -45px'>Hours</span>");
        $("#minutes").html(minutes + "<span style='font-size: 30px; margin-top: -45px'>Minutes</span>");
        $("#seconds").html(seconds + "<span style='font-size: 30px; margin-top: -45px'>Seconds</span>");
      })
    });

  }
  // @ts-ignore
  guilienlac(){
    this.sukienService.sendmessage(this.message).subscribe();
  }


  // reloadData() {
  //   this.sukienService.findAll().subscribe(data => {
  //     this.sukiens = data;
  //   })
  }

