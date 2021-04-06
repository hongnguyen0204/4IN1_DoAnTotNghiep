import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlycongtacvienComponent } from './quanlycongtacvien.component';

describe('QuanlycongtacvienComponent', () => {
  let component: QuanlycongtacvienComponent;
  let fixture: ComponentFixture<QuanlycongtacvienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlycongtacvienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlycongtacvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
