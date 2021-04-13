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
import { TimkiemsukienComponent } from './timkiemsukien/timkiemsukien.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { QuenmatkhauComponent } from './quenmatkhau/quenmatkhau.component';
import { DoimatkhauComponent } from './doimatkhau/doimatkhau.component';

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
    TimkiemsukienComponent,
    QuenmatkhauComponent,
    DoimatkhauComponent,
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
        Ng2SearchPipeModule
    ],
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
