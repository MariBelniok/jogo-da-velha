import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CharacterPlayersService } from './characters-players.service';
import { CharacterModel } from '../models/character.model';
import { GameScoreModel } from '../models/game-score.model';
import { GameContainerService } from '../game-container.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-character-players',
  templateUrl: './character-players.component.html',
  styleUrls: ['./character-players.component.scss'],
  providers: [CharacterPlayersService]
})
export class CharacterPlayersComponent implements OnInit, OnDestroy {
  score: GameScoreModel = {} as GameScoreModel;
  destroy$: Subject<boolean> = new Subject<boolean>();

  
  @Input() set gameScore(value: GameScoreModel){
    this.score = value;
  }

  players: CharacterModel[];

  constructor(
    private characterService: CharacterPlayersService,
    private containerService: GameContainerService
  ) { }

  ngOnInit(): void {
    this.characterService.playerCharacters$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(char => {
        this.players = char
        
        if (this.players.length === 2){
          this.containerService.setPlayersReady();
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
