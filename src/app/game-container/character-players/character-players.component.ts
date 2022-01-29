import { Component, Input, OnInit } from '@angular/core';
import { CharacterPlayersService } from './characters-players.service';
import { CharacterModel } from '../models/character.model';
import { GameScoreModel } from '../models/game-score.model';

@Component({
  selector: 'app-character-players',
  templateUrl: './character-players.component.html',
  styleUrls: ['./character-players.component.scss'],
  providers: [CharacterPlayersService]
})
export class CharacterPlayersComponent implements OnInit {
  score: GameScoreModel = {} as GameScoreModel;
  
  @Input() set gameScore(value: GameScoreModel){
    this.score = value;
  }

  players: CharacterModel[];

  constructor(
    private characterService: CharacterPlayersService
  ) { }

  ngOnInit(): void {
    console.log(this.score)

    this.characterService.playerCharacters$
      .subscribe(char => this.players = char)
  }

}
