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
  players$ = this.characterService.playerCharacters$;

  constructor(
    private characterService: CharacterPlayersService
  ) { }

  ngOnInit(): void {
  }

}
