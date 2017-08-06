import { TestBed, inject } from '@angular/core/testing';

import { StandingService } from './standing.service';

describe('StandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StandingService]
    });
  });

  it('should be created', inject([StandingService], (service: StandingService) => {
    expect(service).toBeTruthy();
  }));
});
