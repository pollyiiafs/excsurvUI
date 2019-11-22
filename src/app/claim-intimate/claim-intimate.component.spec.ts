import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimIntimateComponent } from './claim-intimate.component';

describe('ClaimIntimateComponent', () => {
  let component: ClaimIntimateComponent;
  let fixture: ComponentFixture<ClaimIntimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimIntimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimIntimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
