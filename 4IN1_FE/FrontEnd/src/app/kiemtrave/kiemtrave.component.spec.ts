import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemtraveComponent } from './kiemtrave.component';

describe('KiemtraveComponent', () => {
  let component: KiemtraveComponent;
  let fixture: ComponentFixture<KiemtraveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KiemtraveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemtraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
