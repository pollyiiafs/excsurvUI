import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ReportVoucherComponent } from './report-voucher/report-voucher.component';
import { ReportMisComponent } from './report-mis/report-mis.component';
import { ReportIncentiveComponent } from './report-incentive/report-incentive.component';
import { ClaimIntimateComponent } from './claim-intimate/claim-intimate.component';
import { ClaimNewComponent } from './claim-new/claim-new.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent},
  { path: 'report-voucher', component: ReportVoucherComponent},
  { path: 'report-mis', component: ReportMisComponent},
  { path: 'report-incentive', component: ReportIncentiveComponent },
  { path: 'claim-intimate', component: ClaimIntimateComponent },
  { path: 'claim-intimate/:id', component: ClaimIntimateComponent },
  { path: 'claim-new', component: ClaimNewComponent },
  {path : '', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
