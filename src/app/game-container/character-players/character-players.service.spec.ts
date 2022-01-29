import { TestBed } from '@angular/core/testing';

import { CharacterPlayersService } from './characters-players.service';

describe('HeroPlayersService', () => {
  let service: CharacterPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
