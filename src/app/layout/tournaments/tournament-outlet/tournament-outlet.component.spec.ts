import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentOutletComponent } from './tournament-outlet.component';

describe('TournamentOutletComponent', () => {
  let component: TournamentOutletComponent;
  let fixture: ComponentFixture<TournamentOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
