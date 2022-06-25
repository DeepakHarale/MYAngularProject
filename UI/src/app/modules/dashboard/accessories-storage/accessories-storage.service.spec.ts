import { TestBed } from '@angular/core/testing';

import { AccessoriesStorageService } from './accessories-storage.service';

describe('AccessoriesStorageService', () => {
  let service: AccessoriesStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessoriesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
