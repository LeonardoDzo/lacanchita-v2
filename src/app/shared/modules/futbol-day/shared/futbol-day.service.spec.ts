import { TestBed, inject } from '@angular/core/testing';

import { FutbolDayService } from './futbol-day.service';

describe('FutbolDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FutbolDayService]
    });
  });

  it('should be created', inject([FutbolDayService], (service: FutbolDayService) => {
    expect(service).toBeTruthy();
  }));
});
