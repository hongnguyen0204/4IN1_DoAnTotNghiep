import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DangkitochucsukienComponent} from './dangkitochucsukien/dangkitochucsukien.component';
import {DangkithamgiasukienComponent} from './dangkithamgiasukien/dangkithamgiasukien.component';
import {TrangchuComponent} from './trangchu/trangchu.component';
import {DangkilamcongtacvienComponent} from './dangkilamcongtacvien/dangkilamcongtacvien.component';
import {ThongtincanhanComponent} from './thongtincanhan/thongtincanhan.component';
import {SukienComponent} from './sukien/sukien.component';
import {TimkiemsukienComponent} from './timkiemsukien/timkiemsukien.component';
import {DangnhapComponent} from './dangnhap/dangnhap.component';
import {DangkyComponent} from './dangky/dangky.component';
import {QuanlycongtacvienComponent} from './quanlycongtacvien/quanlycongtacvien.component';
import {QuenmatkhauComponent} from './quenmatkhau/quenmatkhau.component';

const routes: Routes = [
  {path: 'dangkitochuc', component: DangkitochucsukienComponent},
  {path: 'dangkithamgia', component: DangkithamgiasukienComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'dangkicongtacvien', component: DangkilamcongtacvienComponent},
  {path: 'thongtincanhan', component: ThongtincanhanComponent},
  {path: 'sukien', component: SukienComponent},
  {path: 'timkiemsukien', component: TimkiemsukienComponent},
  {path: 'dangnhap', component: DangnhapComponent},
  {path: 'quenmatkhau', component: QuenmatkhauComponent},
  {path: 'quanlycongtacvien', component: QuanlycongtacvienComponent},
  {path: 'add', component: DangkyComponent},
  {path: '', redirectTo: '/trangchu', pathMatch: 'full' },
  {path: '', redirectTo: 'dangkithamgiasukien', pathMatch:'full' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
