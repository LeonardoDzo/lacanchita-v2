import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentItemComponent } from './tournament-item.component';

describe('TournamentItemComponent', () => {
  let component: TournamentItemComponent;
  let fixture: ComponentFixture<TournamentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
