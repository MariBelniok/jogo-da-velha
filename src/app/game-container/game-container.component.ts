import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GameContainerService } from './game-container.service';
import { GameScoreModel } from './models/game-score.model';

@Component({
  selector: 'app-game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss']
})
export class GameContainerComponent implements OnInit, OnDestroy {
  gameScore: GameScoreModel = {} as GameScoreModel;
  playersReady$ = this.containerService.playersReady$;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private containerService: GameContainerService) { }

  ngOnInit(): void {
    this.containerService.gameScore$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(scores => this.gameScore = scores);
  }

  onRoundWinner(winner: string) {
    this.containerService.roundWinner(winner);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
