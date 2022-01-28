import { Component, OnInit } from '@angular/core';
import { CharacterPlayersService } from './characters-players.service';
import { CharacterModel } from '../models/character.model';

@Component({
  selector: 'app-character-players',
  templateUrl: './character-players.component.html',
  styleUrls: ['./character-players.component.scss'],
  providers: [CharacterPlayersService]
})
export class CharacterPlayersComponent implements OnInit {
  players: CharacterModel[] = {} as CharacterModel[];

  constructor(
    private characterService: CharacterPlayersService
  ) { }

  ngOnInit(): void {
    this.characterService.playerCharacters$
      .subscribe(characters => {
        if ( characters ) {
          this.players = characters;

          console.log(this.players)
        }
      })
  }

}
