import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { CharacterPlayersService } from './characters-players.service';

describe('CharacterPlayersService', () => {
  let service: CharacterPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        CharacterPlayersService,
      ]
    });
    service = TestBed.inject(CharacterPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
