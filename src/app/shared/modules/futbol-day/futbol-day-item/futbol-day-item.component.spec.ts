import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolDayItemComponent } from './futbol-day-item.component';

describe('FutbolDayItemComponent', () => {
  let component: FutbolDayItemComponent;
  let fixture: ComponentFixture<FutbolDayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutbolDayItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutbolDayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
