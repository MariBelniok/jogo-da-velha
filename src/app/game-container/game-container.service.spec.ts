import { TestBed } from '@angular/core/testing';
import { GameContainerService } from './game-container.service';

describe('GameContainerService', () => {
  let serviceSpy: jasmine.SpyObj<GameContainerService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameContainerService]
    });
    serviceSpy = TestBed.inject(GameContainerService) as jasmine.SpyObj<GameContainerService>;
  });

  it('should be created', () => {
    expect(serviceSpy).toBeTruthy();
  });

  it('should set players ready', () => {
    let playersReady = false;
    serviceSpy.setPlayersReady();

    serviceSpy.playersReady$.subscribe(value => playersReady = value);

    expect(playersReady).toBeTruthy();
  })

  it('should be playerX turn', () => {
    let isPlayerXTurn = false;
    serviceSpy.setIsPlayerXTurn(true);
    serviceSpy.isPlayerXTurn$.subscribe(value => isPlayerXTurn = value);

    expect(isPlayerXTurn).toBeTruthy();
  })

  it('should not be to playerX turn', () => {
    let isPlayerXTurn = false;
    serviceSpy.setIsPlayerXTurn(false);
    serviceSpy.isPlayerXTurn$.subscribe(value => isPlayerXTurn = value);

    expect(isPlayerXTurn).not.toBeTruthy();
  })

  it('should increase playerX score when it wins a match', () => {
    let playerX = 0;
    serviceSpy.roundWinner('X');

    serviceSpy.gameScore$.subscribe(value => playerX = value.playerX);

    expect(playerX).toBe(1);
  })

  it('should increase playerO score when it wins a match', () => {
    let playerO = 0;
    serviceSpy.roundWinner('O');

    serviceSpy.gameScore$.subscribe(value => playerO = value.playerO);

    expect(playerO).toBe(1);
  })

  it('should increase tie score when match has no winner', () => {
    let tie = 0;
    serviceSpy.roundWinner('Tie');

    serviceSpy.gameScore$.subscribe(value => tie = value.tie);

    expect(tie).toBe(1);
  })
});
