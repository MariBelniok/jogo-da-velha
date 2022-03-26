import { Component, OnInit } from '@angular/core';
import { GameContainerService } from '../game-container.service';

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

    this.checkForWinner();
  }

  checkForWinner() {
    const possibleIndexCombinations = [
      { index1: 0, index2: 3, index3: 6 },
      { index1: 1, index2: 4, index3: 7 },
      { index1: 2, index2: 5, index3: 8 },
      { index1: 0, index2: 1, index3: 2 },
      { index1: 3, index2: 4, index3: 5 },
      { index1: 6, index2: 7, index3: 8 },
      { index1: 0, index2: 4, index3: 8 },
      { index1: 2, index2: 4, index3: 6 },
    ];

    for (let combination of possibleIndexCombinations) {
      const { index1, index2, index3 } = combination;
      this.matchValues(index1, index2, index3);
    }

    this.containerService.roundWinner(this.winner);
  }

  matchValues(index1: number, index2: number, index3: number) {
    if (
      this.gameBoardSpaces[index1] &&
      this.gameBoardSpaces[index1] == this.gameBoardSpaces[index2] &&
      this.gameBoardSpaces[index1] == this.gameBoardSpaces[index3]
    ) {
      this.winner = !this.currentPlayerIsX ? 'X' : 'O';
    }

    if (this.movesCounter > 8 && !this.winner) {
      this.winner = 'Tie';
    }
  }

  onPlayAgain(){
    this.startNewGame();
  }

}
