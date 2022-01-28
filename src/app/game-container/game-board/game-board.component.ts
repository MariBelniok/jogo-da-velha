import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  gameBoardSpaces = new Array(9);
  winner: 'X' | 'O' | 'Tie';
  currentPlayerIsX: boolean;
  movesCounter: number;

  constructor() { }

  ngOnInit(): void {
    this.startNewGame()
  }

  startNewGame() {
    this.gameBoardSpaces.fill(null);
    this.currentPlayerIsX = true;
    this.winner = null;
    this.movesCounter = 0;
  }

  markSpace(index: number) {
    if(!this.gameBoardSpaces[index]) {
      this.gameBoardSpaces[index] = this.currentPlayerIsX ? 'X' : 'O';

      this.currentPlayerIsX = !this.currentPlayerIsX;
      this.movesCounter += 1;
    }

    this.checkForWinner();
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

    console.log("winner: ", winner)

    return winner;
  }

}
