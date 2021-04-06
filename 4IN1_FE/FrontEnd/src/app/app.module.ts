import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DangkitochucsukienComponent } from './dangkitochucsukien/dangkitochucsukien.component';
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
import {FormsModule} from '@angular/forms';
import {AdminModule} from './admin/admin.module';

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
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CKEditorModule,
        FormsModule,
        AdminModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
