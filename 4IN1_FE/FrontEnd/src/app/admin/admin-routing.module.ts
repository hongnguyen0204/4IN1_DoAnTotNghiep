import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {ThongkeComponent} from './chitietsukien/thongke.component';
import {SukienComponent} from './sukien/sukien.component';
import {TintucComponent} from './tintuc/tintuc.component';
import {ThemmoitintucComponent} from './themmoitintuc/themmoitintuc.component';
import {SuatintucComponent} from './suatintuc/suatintuc.component';
import {AdminAuthService} from '../_services/admin.service';
import {ActiveService} from '../_services/active.service';


const routes: Routes = [
  {path: 'admin/dashboard', component: DashboardComponent, canActivate:[AdminAuthService] },
  {path: 'admin/login', component: LoginComponent,canActivate: [ActiveService]},
  {path: 'admin/chitietsukien/:id', component: ThongkeComponent, canActivate:[AdminAuthService]  },
  {path: 'admin/sukien', component: SukienComponent, canActivate:[AdminAuthService]  },
  {path: 'admin/tintuc', component: TintucComponent, canActivate:[AdminAuthService]  },
  {path: 'admin/themmoitintuc', component: ThemmoitintucComponent, canActivate:[AdminAuthService]  },
  {path: 'admin/suatintuc/:id', component: SuatintucComponent, canActivate:[AdminAuthService]  },
  {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
