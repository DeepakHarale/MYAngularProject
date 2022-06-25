import { TestBed } from '@angular/core/testing';

import { ApproveTimesheetService } from './approve-timesheet.service';

describe('ApproveTimesheetService', () => {
  let service: ApproveTimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveTimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
