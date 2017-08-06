import { RouterTestingModule } from '@angular/router/testing/src/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesComponent } from './leagues.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

describe('LeaguesComponent', () => {
  let component: LeaguesComponent;
  let fixture: ComponentFixture<LeaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,
      PageHeaderModule],
      declarations: [ LeaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
