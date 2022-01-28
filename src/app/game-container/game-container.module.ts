import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameContainerComponent } from './game-container.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CharacterPlayersComponent } from './hero-players/character-players.component';
import { CharacterPlayersFormComponent } from './hero-players/hero-players-form/character-players-form.component';

@NgModule({
  declarations: [
    GameContainerComponent,
    GameBoardComponent,
    CharacterPlayersComponent,
    CharacterPlayersFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  exports: [
    GameContainerComponent,
    GameBoardComponent,
    CharacterPlayersComponent,
    CharacterPlayersFormComponent
  ]
})

export class GameContainerModule { }
