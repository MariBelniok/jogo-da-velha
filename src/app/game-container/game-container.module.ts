import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GameContainerComponent } from './game-container.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CharacterPlayersComponent } from './character-players/character-players.component';
import { CharacterPlayersFormComponent } from './character-players/character-players-form/character-players-form.component';
import { GameContainerService } from './game-container.service';
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
  ],
  providers: [
    GameContainerService
  ]
})

export class GameContainerModule { }
