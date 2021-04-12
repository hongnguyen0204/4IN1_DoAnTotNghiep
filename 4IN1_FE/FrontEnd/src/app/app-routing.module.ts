// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
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
import {TimkiemsukienComponent} from './timkiemsukien/timkiemsukien.component';

const routes: Routes = [
  {path: 'dangkitochuc', component: DangkitochucsukienComponent},
  {path: 'dangkithamgia/:id', component: DangkithamgiasukienComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'dangkicongtacvien', component: DangkilamcongtacvienComponent},
  {path: 'thongtincanhan', component: ThongtincanhanComponent},
  {path: 'sukien', component: SukienComponent},
  {path: 'dangnhap', component: DangnhapComponent},
  {path: 'dangky', component: DangkyComponent},
  {path: 'quenmatkhau', component: QuenmatkhauComponent},
  {path: 'quanlycongtacvien', component: QuanlycongtacvienComponent},
  {path: 'quanlysukien', component: QuanlysukienComponent},
  {path: 'sukiencuatoi', component: SukiencuatoiComponent},
  {path: 'add', component: DangkyComponent},
  {path: 'timkiemsukien', component: TimkiemsukienComponent},
  {path: '', redirectTo: '/trangchu', pathMatch: 'full' }
  ];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
