import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMisComponent } from './report-mis.component';

describe('ReportMisComponent', () => {
  let component: ReportMisComponent;
  let fixture: ComponentFixture<ReportMisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportMisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
