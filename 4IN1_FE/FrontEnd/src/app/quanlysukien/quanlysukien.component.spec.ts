import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlysukienComponent } from './quanlysukien.component';

describe('QuanlysukienComponent', () => {
  let component: QuanlysukienComponent;
  let fixture: ComponentFixture<QuanlysukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuanlysukienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanlysukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
