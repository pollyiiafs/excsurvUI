import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimNewComponent } from './claim-new.component';

describe('ClaimNewComponent', () => {
  let component: ClaimNewComponent;
  let fixture: ComponentFixture<ClaimNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
