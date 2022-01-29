import { TestBed } from '@angular/core/testing';

import { GameContainerService } from './game-container.service';

describe('GameContainerService', () => {
  let service: GameContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
