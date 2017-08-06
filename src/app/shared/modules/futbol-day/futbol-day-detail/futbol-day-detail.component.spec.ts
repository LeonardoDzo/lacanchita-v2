import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolDayDetailComponent } from './futbol-day-detail.component';

describe('FutbolDayDetailComponent', () => {
  let component: FutbolDayDetailComponent;
  let fixture: ComponentFixture<FutbolDayDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutbolDayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutbolDayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
