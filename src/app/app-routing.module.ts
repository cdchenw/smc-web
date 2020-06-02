import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportDataComponent } from './admin/import-data/import-data.component';
import { ManageCompanyComponent } from './admin/manage-company/manage-company.component';
import { ManageExchangeComponent } from './admin/manage-exchange/manage-exchange.component';
import { ManageIpoComponent } from './admin/manage-ipo/manage-ipo.component';
import { ImportSuccessComponent } from './admin/import-success/import-success.component';
import { CompanyComponent } from './user/company/company.component';
import { IposPlanComponent } from './user/ipos-plan/ipos-plan.component';
import { ComparisionComponent } from './user/comparision/comparision.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { HelpCenterComponent } from './user/help-center/help-center.component';
import { LoginComponent } from './user/login/login.component';
import { RegistComponent } from './user/regist/regist.component';
import { AuthGuard } from './common/auth.guard';
import { AdminGuard } from './common/admin.guard';
import { UserGuard } from './common/user.guard';

const routes: Routes = [
  { path: '',  redirectTo: '/company', pathMatch: 'full'},
  { path: 'import', component: ImportDataComponent, canActivate: [ AuthGuard , AdminGuard]},
  { path: 'import-success', component: ImportSuccessComponent, canActivate: [ AuthGuard, AdminGuard ]},
  { path: 'mcompany', component: ManageCompanyComponent, canActivate: [ AuthGuard, AdminGuard] },
  { path: 'exchange', component: ManageExchangeComponent, canActivate: [ AuthGuard, AdminGuard] },
  { path: 'ipo', component: ManageIpoComponent, canActivate: [ AuthGuard, AdminGuard ] },
  { path: 'company', component: CompanyComponent, canActivate: [ AuthGuard, UserGuard ] },
  { path: 'iposplan', component: IposPlanComponent, canActivate: [ AuthGuard, UserGuard ] },
  { path: 'comparision', component: ComparisionComponent, canActivate: [ AuthGuard, UserGuard] },
  { path: 'profile', component: MyProfileComponent, canActivate: [ AuthGuard, UserGuard ] },
  { path: 'updatepwd', component: ResetPasswordComponent, canActivate: [ AuthGuard, UserGuard ] },
  { path: 'helpcenter', component: HelpCenterComponent, canActivate: [ AuthGuard, UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'regist', component: RegistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
