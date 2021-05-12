import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimkiemsukienComponent } from './timkiemsukien.component';

describe('TimkiemsukienComponent', () => {
  let component: TimkiemsukienComponent;
  let fixture: ComponentFixture<TimkiemsukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimkiemsukienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimkiemsukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
