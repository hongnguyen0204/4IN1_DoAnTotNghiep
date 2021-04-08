import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {ThongkeComponent} from './chitietsukien/thongke.component';
import {SukienComponent} from './sukien/sukien.component';
import {TintucComponent} from './tintuc/tintuc.component';
import {ThemmoitintucComponent} from './themmoitintuc/themmoitintuc.component';
import {SuatintucComponent} from "./suatintuc/suatintuc.component";


const routes: Routes = [
  {path: 'admin/dashboard', component: DashboardComponent },
  {path: 'admin/login', component: LoginComponent },
  {path: 'admin/chitietsukien', component: ThongkeComponent },
  {path: 'admin/sukien', component: SukienComponent },
  {path: 'admin/tintuc', component: TintucComponent },
  {path: 'admin/themmoitintuc', component: ThemmoitintucComponent },
  {path: 'admin/suatintuc', component: SuatintucComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
