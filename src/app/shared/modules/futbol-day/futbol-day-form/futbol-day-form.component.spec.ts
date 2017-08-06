import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolDayFormComponent } from './futbol-day-form.component';

describe('FutbolDayFormComponent', () => {
  let component: FutbolDayFormComponent;
  let fixture: ComponentFixture<FutbolDayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FutbolDayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FutbolDayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
