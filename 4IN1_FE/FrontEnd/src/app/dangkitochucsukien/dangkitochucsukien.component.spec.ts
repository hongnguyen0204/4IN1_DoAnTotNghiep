import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DangkitochucsukienComponent } from './dangkitochucsukien.component';

describe('DangkitochucsukienComponent', () => {
  let component: DangkitochucsukienComponent;
  let fixture: ComponentFixture<DangkitochucsukienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkitochucsukienComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkitochucsukienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
