import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './shared/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './shared/interceptor';
import { MainComponent } from './main/main.component';
import { ReportMisComponent } from './report-mis/report-mis.component';
import { ReportIncentiveComponent } from './report-incentive/report-incentive.component';
import { ReportVoucherComponent } from './report-voucher/report-voucher.component';
import { ClaimIntimateComponent } from './claim-intimate/claim-intimate.component';
import { ClaimNewComponent } from './claim-new/claim-new.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ReportMisComponent,
    ReportIncentiveComponent,
    ReportVoucherComponent,
    ClaimIntimateComponent,
    ClaimNewComponent
  ],
  imports: [
    TypeaheadModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot()
    
  ],
  providers: [ApiService,{provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
