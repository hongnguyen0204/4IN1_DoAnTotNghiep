import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkithamgiasukienComponent } from './dangkithamgiasukien.component';

describe('DangkithamgiasukienComponent', () => {
  let component: DangkithamgiasukienComponent;
  let fixture: ComponentFixture<DangkithamgiasukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkithamgiasukienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkithamgiasukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
