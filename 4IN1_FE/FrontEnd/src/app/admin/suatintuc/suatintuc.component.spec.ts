import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuatintucComponent } from './suatintuc.component';

describe('SuatintucComponent', () => {
  let component: SuatintucComponent;
  let fixture: ComponentFixture<SuatintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuatintucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuatintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
