import { Component, OnInit } from '@angular/core';
import { GameContainerService } from './game-container.service';
import { GameScoreModel } from './models/game-score.model';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit {
  gameScore: GameScoreModel = {} as GameScoreModel;

  constructor(private containerService: GameContainerService) { }

  ngOnInit(): void {
    this.containerService.gameScore$
      .subscribe(scores => this.gameScore = scores);
  }

  onRoundWinner(winner: string) {
    this.containerService.roundWinner(winner);
  }

}
