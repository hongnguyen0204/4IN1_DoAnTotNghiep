import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DangkitochucsukienComponent} from './dangkitochucsukien/dangkitochucsukien.component';
import {DangkithamgiasukienComponent} from './dangkithamgiasukien/dangkithamgiasukien.component';
import {TrangchuComponent} from './trangchu/trangchu.component';
import {DangkilamcongtacvienComponent} from './dangkilamcongtacvien/dangkilamcongtacvien.component';
import {ThongtincanhanComponent} from './thongtincanhan/thongtincanhan.component';
import {SukienComponent} from './sukien/sukien.component';
import {DangnhapComponent} from './dangnhap/dangnhap.component';
import {DangkyComponent} from './dangky/dangky.component';
import {QuanlycongtacvienComponent} from './quanlycongtacvien/quanlycongtacvien.component';
import {QuenmatkhauComponent} from './quenmatkhau/quenmatkhau.component';
import {QuanlysukienComponent} from './quanlysukien/quanlysukien.component';
import {SukiencuatoiComponent} from './sukiencuatoi/sukiencuatoi.component';
import {CustomerAuthService} from './_services/customer.service';
import {TintucComponent} from './tintuc/tintuc.component';
import {TimkiemsukienComponent} from './timkiemsukien/timkiemsukien.component';
import {DoimatkhauComponent} from './doimatkhau/doimatkhau.component';
import {XacthucemailComponent} from './xacthucemail/xacthucemail.component';
import {ActiveService} from './_services/active.service';
import {ChitiettintucComponent} from './chitiettintuc/chitiettintuc.component';
import {NguoithamgiasukienComponent} from './nguoithamgiasukien/nguoithamgiasukien.component';


const routes: Routes = [
  {path: 'dangkitochuc', component: DangkitochucsukienComponent,canActivate:[CustomerAuthService]},
  {path: 'dangkithamgia/:id', component: DangkithamgiasukienComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'dangkicongtacvien/:id', component: DangkilamcongtacvienComponent,canActivate:[CustomerAuthService]},
  {path: 'thongtincanhan', component: ThongtincanhanComponent,canActivate:[CustomerAuthService]},
  {path: 'sukien', component: SukienComponent},
  {path: 'timkiemsukien', component: TimkiemsukienComponent},
  {path: 'dangnhap', component: DangnhapComponent,canActivate: [ActiveService]},
  {path: 'dangky', component: DangkyComponent},
  {path: 'quenmatkhau', component: QuenmatkhauComponent},
  {path: 'tintuc', component: TintucComponent},
  {path: 'chitiettintuc/:id', component: ChitiettintucComponent},
  {path: 'quanlycongtacvien', component: QuanlycongtacvienComponent,canActivate:[CustomerAuthService]},
  {path: 'quanlysukien', component: QuanlysukienComponent,canActivate:[CustomerAuthService]},
  {path: 'sukiencuatoi', component: SukiencuatoiComponent,canActivate:[CustomerAuthService]},
  {path: 'nguoithamgiasukien', component: NguoithamgiasukienComponent,canActivate:[CustomerAuthService]},
  {path: 'doimatkhau/:token', component: DoimatkhauComponent},
  {path: 'xacthucemail/:token', component: XacthucemailComponent},
  {path: 'add', component: DangkyComponent},
  {path: '', redirectTo: '/trangchu', pathMatch: 'full' }
  ];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
