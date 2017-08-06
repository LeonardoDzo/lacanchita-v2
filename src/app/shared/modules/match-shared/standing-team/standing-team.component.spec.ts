import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingTeamComponent } from './standing-team.component';

describe('StandingTeamComponent', () => {
  let component: StandingTeamComponent;
  let fixture: ComponentFixture<StandingTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
