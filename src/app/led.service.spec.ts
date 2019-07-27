import { TestBed } from '@angular/core/testing';

import { LEDService } from './led.service';

describe('LEDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LEDService = TestBed.get(LEDService);
    expect(service).toBeTruthy();
  });
});
