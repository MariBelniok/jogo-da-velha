import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { GameContainerService } from '../game-container.service';
import { CharacterModel } from '../models/character.model';

import { CharacterPlayersComponent } from './character-players.component';
import { CharacterPlayersService } from './characters-players.service';

const characterPlayersServiceMock = {
  playerCharacters$: of([
    {
      player: 'X',
      name: 'Thor',
      thumbnailUrl: 'thor.png'
    },
    {
      player: 'O',
      name: 'Hulk',
      thumbnailUrl: 'hulk.png'
    }
  ]),
  isPlayerXTurn$: true,
  setPlayersReady: () => { return true }
}

describe('CharacterPlayersComponent', () => {
  let component: CharacterPlayersComponent;
  let fixture: ComponentFixture<CharacterPlayersComponent>;
  let containerService: GameContainerService;
  let charactersService: CharacterPlayersService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPlayersComponent ],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        GameContainerService,
        { provide: CharacterPlayersService, useValue: characterPlayersServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    containerService = TestBed.inject(GameContainerService);
    charactersService = TestBed.inject(CharacterPlayersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load two characters on init', async () => {
    let players = [];
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      charactersService.playerCharacters$.subscribe(value => players = value);
      expect(players.length).toBe(2);
    });
  });

  it('should change isXTurn to true when init', async () => {
    let isXTurn = false;
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      containerService.isPlayerXTurn$.subscribe(value => isXTurn = value);
      expect(component.isXturn).toBeTruthy();
    });
  });

  it('should set players ready on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      charactersService.playerCharacters$.subscribe(value => {
        if (value.length === 2) {
          expect(characterPlayersServiceMock.setPlayersReady()).toHaveBeenCalled();
        }
      });
    });
  })
});
