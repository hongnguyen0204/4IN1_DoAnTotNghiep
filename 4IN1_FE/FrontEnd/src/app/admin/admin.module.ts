import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ThongkeComponent } from './chitietsukien/thongke.component';
import { SukienComponent } from './sukien/sukien.component';
import {DataTablesModule} from 'angular-datatables';
import { TintucComponent } from './tintuc/tintuc.component';
import { ThemmoitintucComponent } from './themmoitintuc/themmoitintuc.component';
import {CKEditorModule} from 'ckeditor4-angular';
import {FormsModule} from '@angular/forms';
import { SuatintucComponent } from './suatintuc/suatintuc.component';
import { QuanlytaikhoanComponent } from './quanlytaikhoan/quanlytaikhoan.component';
@NgModule({

  declarations: [
    DashboardComponent,
    LoginComponent,
    ThongkeComponent,
    SukienComponent,
    TintucComponent,
    ThemmoitintucComponent,
    SuatintucComponent,
    QuanlytaikhoanComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        DataTablesModule,
        CKEditorModule,
        FormsModule
    ]
})
export class AdminModule { }
