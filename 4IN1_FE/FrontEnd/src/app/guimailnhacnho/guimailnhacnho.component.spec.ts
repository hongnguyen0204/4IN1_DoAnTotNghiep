import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuimailnhacnhoComponent } from './guimailnhacnho.component';

describe('GuimailnhacnhoComponent', () => {
  let component: GuimailnhacnhoComponent;
  let fixture: ComponentFixture<GuimailnhacnhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuimailnhacnhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuimailnhacnhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
