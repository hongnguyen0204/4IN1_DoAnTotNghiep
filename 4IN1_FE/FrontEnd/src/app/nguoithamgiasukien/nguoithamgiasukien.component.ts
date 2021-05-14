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
  sukiens: Sukien[];
  // @ts-ignore
  id: number;
  // @ts-ignore
  id_event;
  // @ts-ignore
  idevent: number;
  nguoithamgias:any;

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private token: TokenStorageService,
              private ctvService: CongtacvienService) {}

  ngOnInit(): void {

    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      dom: 'Bfrtip',
      // @ts-ignore
      buttons: [
        'copy',
        'print',
        'excel',
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
  duyet(status: boolean, id: number){
    console.log(status);
    if (status){
      this.ctvService.updatenotok(id).subscribe();
    }
    else {
      this.ctvService.updateok(id).subscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ntg(){
    this.skService.getNTGbyid(this.idevent).subscribe(data =>{
      // @ts-ignore
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.nguoithamgias = data;
        this.dtTrigger.next();
      });
    });
  }
<<<<<<< HEAD
  // @ts-ignore
  laydsntg(){
    this.skService.email(this.idevent).subscribe(data=>{
      console.log(this.idevent);
    });
  }
  reloadData() {
    this.skService.findSKDD().subscribe(data => {
      this.sukiens = data;
    })
  }

  detailGNN() {
    this.laydsntg();
    this.router.navigate(['guimailnhacnho',this.idevent]).then(() => {
      window.scrollTo(0,0)
    });

  }
=======
>>>>>>> 90219032fe47fde10f6c65d3e341008dd38cf62e
}
