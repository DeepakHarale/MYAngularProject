import { TestBed } from '@angular/core/testing';

import { ProjectTaskDetailsService } from './project-task-details.service';

describe('ProjectTaskDetailsService', () => {
  let service: ProjectTaskDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectTaskDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
