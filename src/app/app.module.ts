import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImportDataComponent } from './admin/import-data/import-data.component';
import { ManageCompanyComponent } from './admin/manage-company/manage-company.component';
import { ManageExchangeComponent } from './admin/manage-exchange/manage-exchange.component';
import { ManageIpoComponent } from './admin/manage-ipo/manage-ipo.component';
import { ImportSuccessComponent } from './admin/import-success/import-success.component';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MultiSelectDropdownComponent } from './components/multi-select-dropdown/multi-select-dropdown.component';
import { CompanyComponent } from './user/company/company.component';
import { IposPlanComponent } from './user/ipos-plan/ipos-plan.component';
import { ComparisionComponent } from './user/comparision/comparision.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { HelpCenterComponent } from './user/help-center/help-center.component';
import { LoginComponent } from './user/login/login.component';
import { RegistComponent } from './user/regist/regist.component';
import { SmcHttpInterceptor } from './common';

@NgModule({
  declarations: [
    AppComponent,
    ImportDataComponent,
    ManageCompanyComponent,
    ManageExchangeComponent,
    ManageIpoComponent,
    ImportSuccessComponent,
    SortableHeaderDirective,
    ClickOutsideDirective,
    MultiSelectDropdownComponent,
    CompanyComponent,
    IposPlanComponent,
    ComparisionComponent,
    LoadingComponent,
    MyProfileComponent,
    ResetPasswordComponent,
    HelpCenterComponent,
    LoginComponent,
    RegistComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxEchartsModule
  ],
  providers: [
    DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: SmcHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
