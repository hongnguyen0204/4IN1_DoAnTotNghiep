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
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { QuanlysukienComponent } from './quanlysukien/quanlysukien.component';
import { SukiencuatoiComponent } from './sukiencuatoi/sukiencuatoi.component';
import {DataTablesModule} from 'angular-datatables';
import {AuthInterceptor} from './-helpers/auth.interceptor';
import {CustomerAuthService} from './_services/customer.service';
import {AdminAuthService} from './_services/admin.service';
// @ts-ignore
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
import {DatePipe} from "@angular/common";
import {ToastrModule} from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxPaginationModule} from 'ngx-pagination';
import { ConfirmDialogComponent } from './-helpers/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NguoithamgiasukienComponent } from './nguoithamgiasukien/nguoithamgiasukien.component';
import { ThongtinnhomComponent } from './thongtinnhom/thongtinnhom.component';
import { InfoDialogComponent } from './-helpers/info-dialog/info-dialog.component';
import { KiemtraveComponent } from './kiemtrave/kiemtrave.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import { LichsukienComponent } from './lichsukien/lichsukien.component';
import { EventDialogComponent } from './-helpers/event-dialog/event-dialog.component';
import {GuimailnhacnhoComponent} from './guimailnhacnho/guimailnhacnho.component';
import { HuysukienComponent } from './-helpers/huysukien/huysukien.component';
import {MomentModule} from "ngx-moment"; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin

]);
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
    ChitiettintucComponent,
    ConfirmDialogComponent,
    NguoithamgiasukienComponent,
    ThongtinnhomComponent,
    InfoDialogComponent,
    KiemtraveComponent,
    LichsukienComponent,
    EventDialogComponent,
    GuimailnhacnhoComponent,
    HuysukienComponent
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
        Ng2SearchPipeModule,
        BrowserAnimationsModule,
        NotificationModule,
        ToastrModule.forRoot({
          timeOut: 3000,
          positionClass: 'toast-top-center',
          preventDuplicates: true,
        }),
        MatSnackBarModule,
        NgxPaginationModule,
        MatDialogModule,
        FullCalendarModule,
        MomentModule.forRoot({
          relativeTimeThresholdOptions: {
            'm': 59
          }
        })
    ],
  providers: [AuthInterceptor,CustomerAuthService,AdminAuthService,ThongbaoService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
