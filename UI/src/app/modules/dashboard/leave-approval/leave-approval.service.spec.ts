import { TestBed } from '@angular/core/testing';

import { LeaveApprovalService } from './leave-approval.service';

describe('LeaveApprovalService', () => {
  let service: LeaveApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
