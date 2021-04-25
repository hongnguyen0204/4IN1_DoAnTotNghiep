import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SukienService} from '../Service/sukien.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Thongtincanhan} from '../Model/thongtincanhan';
import {ThongtincanhanService} from '../Service/thongtincanhan.service';
import {AccountService} from '../Service/account.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {CongtacvienService} from '../Service/congtacvien.service';
import {Sukien} from '../Model/sukien';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-sukiencuatoi',
  templateUrl: './sukiencuatoi.component.html',
  styleUrls: ['./sukiencuatoi.component.scss'],
  providers: [SukienService, ThongtincanhanService, CongtacvienService]
})
export class SukiencuatoiComponent implements AfterViewInit,OnInit,OnDestroy {

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
  idevent: number;
  qlcongtacviens: any;

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

  tsk(){
    this.skService.getSKbyid(this.idevent).subscribe(data =>{
      // @ts-ignore
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        this.qlcongtacviens = data;
        this.dtTrigger.next();
      });
    });
  }
}
