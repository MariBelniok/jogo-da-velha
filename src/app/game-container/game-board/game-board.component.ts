import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { GameContainerService } from '../game-container.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  @Output() roundWinner = new EventEmitter< 'X' | 'O' | 'TIE' >();

  gameBoardSpaces = new Array(9);
  winner: 'X' | 'O' | 'Tie';
  currentPlayerIsX: boolean;
  movesCounter: number;

  constructor(private containerService: GameContainerService) { }

  ngOnInit(): void {
    this.startNewGame()
  }

  startNewGame() {
    this.gameBoardSpaces.fill(null);
    this.currentPlayerIsX = true;
    this.winner = null;
    this.movesCounter = 0;
    this.containerService.setIsPlayerXTurn(this.currentPlayerIsX);

  }

  markSpace(index: number) {
    if(!this.gameBoardSpaces[index]) {
      this.gameBoardSpaces[index] = this.currentPlayerIsX ? 'X' : 'O';

      this.currentPlayerIsX = !this.currentPlayerIsX;
      this.movesCounter += 1;

      this.containerService.setIsPlayerXTurn(this.currentPlayerIsX);
    }

    const winner = this.checkForWinner();

    if (winner) {
      this.roundWinner.emit(winner);

      const interval$ = interval(1000);

      interval$
        .pipe(
          take(1)
        )
        .subscribe(() => this.startNewGame());
    }
  }

  checkForWinner() {
    let winner: 'X' | 'O' | 'TIE';

    const possibleIndexCombinations = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of possibleIndexCombinations) {
      const [column1, column2, column3] = combination;

      if (
        this.gameBoardSpaces[column1] &&
        this.gameBoardSpaces[column1] === this.gameBoardSpaces[column2] &&
        this.gameBoardSpaces[column1] === this.gameBoardSpaces[column3]
      ) {
        winner = !this.currentPlayerIsX ? 'X' : 'O';
      }

      if (this.movesCounter > 8 && !winner) {
        winner = 'TIE';
      }
    }

    return winner;
  }

}
