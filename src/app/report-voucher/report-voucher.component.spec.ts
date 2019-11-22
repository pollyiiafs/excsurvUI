import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVoucherComponent } from './report-voucher.component';

describe('ReportVoucherComponent', () => {
  let component: ReportVoucherComponent;
  let fixture: ComponentFixture<ReportVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
