import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Firestore } from '@angular/fire/firestore';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Firestore]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
