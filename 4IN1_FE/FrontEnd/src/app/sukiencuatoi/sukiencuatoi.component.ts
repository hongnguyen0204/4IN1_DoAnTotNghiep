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
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../-helpers/info-dialog/info-dialog.component';

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
  checked: boolean;
  // @ts-ignore
  idevent: number;
  qlcongtacviens: any;

  constructor(private skService: SukienService,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private token: TokenStorageService,
              private ctvService: CongtacvienService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {url:'assets/Vietnamese.json'},
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [[5, 10, 15, -1], [5, 10, 15, "All"]],
      dom: 'Bfrtip',
      // @ts-ignore
      buttons: [
        { extend: 'copy', text: 'Sao ch??p' },
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

  // @ts-ignore
  infomation(data){
  this.accountService.findUserbyEmail(data).subscribe(db=>{
    const confirmDialog = this.dialog.open(InfoDialogComponent, {
      data: {
        title: "Khoa: " + db.faculty,
        img: db.img
      }
    });
  })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // @ts-ignore
  duyet(status: boolean, id: number){
    this.checked=status;
    if (this.checked){
      this.ctvService.updatenotok(id).subscribe();
      this.checked=false;

    }
    else {
      this.ctvService.updateok(id).subscribe();
      this.checked = true;
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
