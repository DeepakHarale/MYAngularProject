import { TestBed } from '@angular/core/testing';

import { TimesheetDetailsService } from './timesheet-details.service';

describe('TimesheetDetailsService', () => {
  let service: TimesheetDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
