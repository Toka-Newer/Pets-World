import { TestBed } from '@angular/core/testing';

import { VetScheduleService } from './vet-schedule.service';

describe('VetScheduleService', () => {
  let service: VetScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
