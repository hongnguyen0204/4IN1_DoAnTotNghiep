// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DangkitochucsukienComponent } from './dangkitochucsukien/dangkitochucsukien.component';
// @ts-ignore
import {CKEditorModule} from 'ckeditor4-angular';
import { DangkithamgiasukienComponent } from './dangkithamgiasukien/dangkithamgiasukien.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DangkilamcongtacvienComponent } from './dangkilamcongtacvien/dangkilamcongtacvien.component';
import { ThongtincanhanComponent } from './thongtincanhan/thongtincanhan.component';
import { SukienComponent } from './sukien/sukien.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { DangkyComponent } from './dangky/dangky.component';
import { QuanlycongtacvienComponent } from './quanlycongtacvien/quanlycongtacvien.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// @ts-ignore
import {FormsModule} from '@angular/forms';
import {AdminModule} from './admin/admin.module';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
import {AngularClassDecorators} from 'codelyzer/util/utils';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { QuanlysukienComponent } from './quanlysukien/quanlysukien.component';
import { SukiencuatoiComponent } from './sukiencuatoi/sukiencuatoi.component';
import {DataTablesModule} from 'angular-datatables';
import {AuthInterceptor} from './-helpers/auth.interceptor';
import {CustomerAuthService} from './_services/customer.service';
import {AdminAuthService} from './_services/admin.service';
// @ts-ignore
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TintucComponent } from './tintuc/tintuc.component';
import { TimkiemsukienComponent } from './timkiemsukien/timkiemsukien.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { QuenmatkhauComponent } from './quenmatkhau/quenmatkhau.component';
import { DoimatkhauComponent } from './doimatkhau/doimatkhau.component';

import { XacthucemailComponent } from './xacthucemail/xacthucemail.component';

import { ChitiettintucComponent } from './chitiettintuc/chitiettintuc.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NotificationModule } from '@progress/kendo-angular-notification';
import {ThongbaoService} from './_services/thongbao.service';
import {MatDatepickerModule} from '@angular/material/datepicker';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    DangkitochucsukienComponent,
    DangkithamgiasukienComponent,
    TrangchuComponent,
    DangkilamcongtacvienComponent,
    ThongtincanhanComponent,
    SukienComponent,
    DangnhapComponent,
    DangkyComponent,
    QuanlycongtacvienComponent,
    HeaderComponent,
    FooterComponent,
    QuanlysukienComponent,
    SukiencuatoiComponent,
    TintucComponent,
    TimkiemsukienComponent,
    QuenmatkhauComponent,
    DoimatkhauComponent,
    XacthucemailComponent,
    ChitiettintucComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    FormsModule,
    AdminModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    DataTablesModule,
    MatSnackBarModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    NotificationModule,
    MatDatepickerModule
  ],
  providers: [AuthInterceptor,CustomerAuthService,AdminAuthService,ThongbaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
