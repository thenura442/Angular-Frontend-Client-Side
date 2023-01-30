import { TestBed } from '@angular/core/testing';

import { LecturerGuard } from './lecturer.guard';

describe('LecturerGuard', () => {
  let guard: LecturerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LecturerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
