import {Component, forwardRef, OnInit} from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {SukienService} from '../Service/sukien.service';
import {IFEV} from '../Model/IFEV';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import tippy, {animateFill} from 'tippy.js';
@Component({
  selector: 'app-lichsukien',
  templateUrl: './lichsukien.component.html',
  styleUrls: ['./lichsukien.component.scss'],
  providers:[SukienService]
})
export class LichsukienComponent implements OnInit {

  // @ts-ignore
  calendarOptions: CalendarOptions;
  // @ts-ignore
  // @ts-ignore
  infor:IFEV=new IFEV();
  // @ts-ignore
  date:string;
  // @ts-ignore
  list=[];

  constructor(private skService:SukienService,
              public datepipe: DatePipe,
              public dialog:MatDialog,
              public router:Router) { }

  ngOnInit(): void {
    // need for load calendar bundle first
    this.skService.findSKDDFull().subscribe(data=>{
      for(var val of data){
        // @ts-ignore
        this.date =this.datepipe.transform(val.time_of_event,'yyyy-MM-ddTHH:mmZ');
        this.infor.id=val.id;
        this.infor.title=val.event_name;
        this.infor.date=this.date;
        // @ts-ignore
        this.list.push({id:this.infor.id,title: this.infor.title, date: this.infor.date});
        this.infor=new IFEV();
      }

      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        editable: true,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth'
        },
        eventDidMount: (info) => {
          this.skService.getSK(info.event.id).subscribe(db=>{
          tippy(info.el, {
            content: '<strong>'+db.event_name+'</strong>'+'<br><p>Thời gian:</p>'+this.datepipe.transform(db.time_of_event,'yyyy-MM-dd h:mm a')
              +'<br><p>Địa chỉ:</p>' +db.place,
            duration: 0,
            theme:'light',
            allowHTML: true,
          });
          });
        },
        events:this.list,
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: true
        },
        eventColor: '#378006',
        eventBackgroundColor:'#2E2EFE',
        eventClick:this.handleEventClick.bind(this)
      };
    });
    forwardRef(() => Calendar);
  }
  // @ts-ignore
  handleEventClick(arg) {
          this.router.navigate(['dangkithamgia',arg.event.id]).then(() => {
            window.scrollTo(0,0);
          });
  }
}
