import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPickComponent } from './match-pick.component';

describe('MatchPickComponent', () => {
  let component: MatchPickComponent;
  let fixture: ComponentFixture<MatchPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
