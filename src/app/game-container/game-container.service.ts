import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameScoreModel } from './models/game-score.model';

@Injectable()
export class GameContainerService {

  private _gameScore = new BehaviorSubject<GameScoreModel>({
    playerX: 0,
    playerO: 0,
    tie: 0
  } as GameScoreModel);
  public readonly gameScore$: Observable<GameScoreModel> = this._gameScore.asObservable();

  private _playersReady = new BehaviorSubject<boolean>(false);
  public readonly playersReady$: Observable<boolean> = this._playersReady.asObservable();

  private _isPlayerXTurn = new BehaviorSubject<boolean>(true);
  public readonly isPlayerXTurn$: Observable<boolean> = this._isPlayerXTurn.asObservable();

  constructor() { }

  public roundWinner(winner: string): void {
    let gameScore = this._gameScore.getValue();

    switch(winner){
      case 'X':
        gameScore.playerX += 1;
        break;
      case 'O':
        gameScore.playerO += 1;
        break;
      case 'Tie':
        gameScore.tie += 1;
        break;
    }

    this._gameScore.next(gameScore)
  }

  public setPlayersReady() {
    this._playersReady.next(true);
  }

  public setIsPlayerXTurn(value: boolean) {
    this._isPlayerXTurn.next(value);
  }


}
