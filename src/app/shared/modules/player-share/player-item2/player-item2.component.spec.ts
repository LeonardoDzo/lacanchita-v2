import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerItem2Component } from './player-item2.component';

describe('PlayerItem2Component', () => {
  let component: PlayerItem2Component;
  let fixture: ComponentFixture<PlayerItem2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerItem2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerItem2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
