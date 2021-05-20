import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {Sukien} from '../Model/sukien';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CongtacvienService} from '../Service/congtacvien.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

// @ts-ignore
@Component({
  selector: 'app-nguoithamgiasukien',
  templateUrl: './nguoithamgiasukien.component.html',
  styleUrls: ['./nguoithamgiasukien.component.scss'],
  providers:[SukienService,CongtacvienService,AccountService]
})
export class NguoithamgiasukienComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
    // @ts-ignore
  dtElement: DataTableDirective;
  // @ts-ignore
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentUser: any;
  users: Thongtincanhan = new Thongtincanhan();
  // @ts-ignore
  name;
  // @ts-ignore
  sogio: string;
  form: any = {};
  // @ts-ignore
  outime;
  // @ts-ignore
  outtime1;
  hour = 24;
  // @ts-ignore
  day: number;
  // @ts-ignore
  time_of_event;
  // @ts-ignore
  time_of_event_2;
  // @ts-ignore
  time_of_event_3;
  // @ts-ignore
  sukiens: Sukien[];
  // @ts-ignore
  id: number;
  // @ts-ignore
  email: string;
  // @ts-ignore
  idevent: number;
  // @ts-ignore
  content: string;
  nguoithamgias: any;
  // @ts-ignore
  acc;
  // @ts-ignore
  checked: boolean;
  // @ts-ignore
  event_name: String;

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              public datepipe: DatePipe,
              private accountService: AccountService,
              private token: TokenStorageService,
              private ctvService: CongtacvienService,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.dtOptions = {
      language: {url: 'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
      dom: 'Bfrtip',
      buttons: [
        { extend: 'copy', text: 'Sao chép' },
        { extend: 'print', text: 'in' },
        { extend: 'excel', text: 'Excel' }
      ]
    };
    this.currentUser = this.token.getUser();
    this.accountService.findUser(this.currentUser.username).subscribe(data => {
      this.users = data;
      this.id = this.users.id;
      // tslint:disable-next-line:no-shadowed-variable
      this.skService.getSKbyiduser(this.id).subscribe(data => {
        this.sukiens = data;
      });
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // @ts-ignore
  duyet(status: boolean, id: number) {
    console.log(status);
    if (status) {
      this.ctvService.updatenotok(id).subscribe();
    } else {
      this.ctvService.updateok(id).subscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  // @ts-ignore
  time_of_event_1;

  ntg() {
    this.skService.getchecksendmail(this.idevent).subscribe(data=>{
      this.checked = data;
    });
    this.skService.gettimeofevent(this.idevent).subscribe(data => {
      console.log(data);
      this.time_of_event = data;
      let dte = new Date(this.time_of_event);
      dte.setDate(dte.getDate() - 1);
      this.time_of_event_1 = dte.toString();
      dte.setDate(dte.getDate() - 1);
      this.time_of_event_2 = dte.toString();
      dte.setDate(dte.getDate() - 1);
      this.time_of_event_3 = dte.toString();
      this.time_of_event_1 = this.datepipe.transform(this.time_of_event_1, 'dd-MM-yyyy');
      this.time_of_event_2 = this.datepipe.transform(this.time_of_event_2, 'dd-MM-yyyy');
      this.time_of_event_3 = this.datepipe.transform(this.time_of_event_3, 'dd-MM-yyyy');
    });
    this.skService.getNTGbyid(this.idevent).subscribe(data => {
      // @ts-ignore
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.nguoithamgias = data;
        this.dtTrigger.next();
      });
    });
  }
  // @ts-ignore
  reloadData() {
    this.skService.findSKDD().subscribe(data => {
      this.sukiens = data;
    });
  }

  // @ts-ignore
  day_event;

  getID_Event() {
    // @ts-ignore
    this.acc = this.skService.email(this.idevent).subscribe(data => {
      this.acc = data;
    });
  }
  soatve(id: number): void {
    if (id == undefined) {
      this.toast.warning("Bạn chưa chọn sự kiện");
    } else {
      this.router.navigate(['kiemtrave', id]).then(() => {
        window.scrollTo(0, 0);
        window.location.reload();
      })
    }
  }

  // @ts-ignore
  dayev;

  get_day() {
    this.checked = true;
    if (this.outtime1 == 1) {
      this.outime = this.time_of_event_3;
    } else if (this.outtime1 == 2) {
      this.outime = this.time_of_event_2;
    } else {
      this.outime = this.time_of_event_1;
    }
    this.dayev = this.outime + " " + this.sogio + ":00:00";
    this.dayev = this.dayev.toString();
    console.log(this.dayev);
    this.skService.email(this.idevent, this.dayev).subscribe(data => {
      this.dayev = data;
    })
    this.skService.email(this.idevent,this.dayev).subscribe(data =>{
      this.dayev= data;
    });
  }

  clicked = false;
  actionMethod() {
  }
}
