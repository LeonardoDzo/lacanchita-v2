import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolDayComponent } from './futbol-day.component';

describe('FutbolDayComponent', () => {
  let component: FutbolDayComponent;
  let fixture: ComponentFixture<FutbolDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutbolDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutbolDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
