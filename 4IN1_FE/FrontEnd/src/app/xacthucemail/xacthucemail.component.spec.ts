import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacthucemailComponent } from './xacthucemail.component';

describe('XacthucemailComponent', () => {
  let component: XacthucemailComponent;
  let fixture: ComponentFixture<XacthucemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XacthucemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XacthucemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
