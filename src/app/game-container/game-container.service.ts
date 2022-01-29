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

    console.log(this._gameScore.getValue())
  }
}
