import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkilamcongtacvienComponent } from './dangkilamcongtacvien.component';

describe('DangkilamcongtacvienComponent', () => {
  let component: DangkilamcongtacvienComponent;
  let fixture: ComponentFixture<DangkilamcongtacvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkilamcongtacvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkilamcongtacvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
