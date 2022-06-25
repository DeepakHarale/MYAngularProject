import { TestBed } from '@angular/core/testing';

import { RelivingLetterService } from './reliving-letter.service';

describe('RelivingLetterService', () => {
  let service: RelivingLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelivingLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
