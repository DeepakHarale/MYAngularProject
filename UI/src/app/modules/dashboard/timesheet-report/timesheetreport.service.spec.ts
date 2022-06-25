import { TestBed } from '@angular/core/testing';

import { TimesheetreportService } from './timesheetreport.service';

describe('TimesheetreportService', () => {
  let service: TimesheetreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
