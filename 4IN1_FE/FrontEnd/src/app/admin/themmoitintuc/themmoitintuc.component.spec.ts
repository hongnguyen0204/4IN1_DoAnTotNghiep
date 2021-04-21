import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemmoitintucComponent } from './themmoitintuc.component';

describe('ThemmoitintucComponent', () => {
  let component: ThemmoitintucComponent;
  let fixture: ComponentFixture<ThemmoitintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemmoitintucComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemmoitintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
