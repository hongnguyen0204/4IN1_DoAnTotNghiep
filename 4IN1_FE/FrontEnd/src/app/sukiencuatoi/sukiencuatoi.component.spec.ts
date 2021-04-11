import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SukiencuatoiComponent } from './sukiencuatoi.component';

describe('SukiencuatoiComponent', () => {
  let component: SukiencuatoiComponent;
  let fixture: ComponentFixture<SukiencuatoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SukiencuatoiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SukiencuatoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
