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

const routes: Routes = [
  { path: '',  redirectTo: '/company', pathMatch: 'full'},
  { path: 'import', component: ImportDataComponent },
  { path: 'import-success', component: ImportSuccessComponent },
  { path: 'mcompany', component: ManageCompanyComponent },
  { path: 'exchange', component: ManageExchangeComponent },
  { path: 'ipo', component: ManageIpoComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'iposplan', component: IposPlanComponent },
  { path: 'comparision', component: ComparisionComponent },
  { path: 'profile', component: MyProfileComponent },
  { path: 'updatepwd', component: ResetPasswordComponent },
  { path: 'helpcenter', component: HelpCenterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'regist', component: RegistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
