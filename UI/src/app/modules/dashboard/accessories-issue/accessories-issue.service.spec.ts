import { TestBed } from '@angular/core/testing';

import { AccessoriesIssueService } from './accessories-issue.service';

describe('AccessoriesIssueService', () => {
  let service: AccessoriesIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoriesIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
