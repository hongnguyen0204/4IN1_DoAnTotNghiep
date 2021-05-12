import {Component, OnInit} from '@angular/core';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {Router} from '@angular/router';
import {Message} from '../Model/message';
import {QuanlytintucserviceService} from '../Service/quanlytintucservice.service';
import {Quanlytintuc} from '../Model/quanlytintuc';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  providers: [SukienService,QuanlytintucserviceService]
})
export class TrangchuComponent implements OnInit {

  message: Message = new Message();
  // @ts-ignore
  tintuc:Quanlytintuc[];
  day:any;
  month:any;
  year:any;
  time:any;
  p: number =1;
  // @ts-ignore
  sukien: Sukien[];
  // @ts-ignore
  sukienhot:Sukien = new Sukien();
  m: Date = new Date();
  // @ts-ignore
  month:number = this.m.getMonth() + 1;
  // @ts-ignore
  constructor(private sukienService: SukienService,private router:Router,
              private quanlytintucserviceService: QuanlytintucserviceService) {
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
    this.reloadData();
    this.message.subject="Chọn khoa";
  }

  reloadData() {
    // @ts-ignore
    this.quanlytintucserviceService.findAll().subscribe(data => {
      this.tintuc = data;
    });
  }

  detailTT(id:number){
    this.router.navigate(['chitiettintuc',id]).then(() => {
      window.scrollTo(0,0)
    });
  }

  detailSK(id:number){
    this.router.navigate(['dangkithamgia',id]).then(() => {
      window.scrollTo(0,0)
    });
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
        if(days >=0 || hours >=0 || minutes >=0 || seconds >=0) {
          $("#days").html(days + "<span style='font-size: 30px; margin-top: -30px'>Days</span>");
          $("#hours").html(hours + "<span style='font-size: 30px; margin-top: -30px'>Hours</span>");
          $("#minutes").html(minutes + "<span style='font-size: 30px; margin-top: -30px'>Minutes</span>");
          $("#seconds").html(seconds + "<span style='font-size: 30px; margin-top: -30px'>Seconds</span>");
        }else{
          days = 0;
          hours =0;
          minutes =0;
          seconds =0;
          $("#days").html(days + "<span style='font-size: 30px; margin-top: -30px'>Days</span>");
          $("#hours").html(hours + "<span style='font-size: 30px; margin-top: -30px'>Hours</span>");
          $("#minutes").html(minutes + "<span style='font-size: 30px; margin-top: -30px'>Minutes</span>");
          $("#seconds").html(seconds + "<span style='font-size: 30px; margin-top: -30px'>Seconds</span>");
        }
      })
    });
  }
  // @ts-ignore
  guilienlac(){
    this.sukienService.sendmessage(this.message).subscribe();
  }

}
