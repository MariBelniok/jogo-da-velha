import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GameContainerComponent } from './game-container.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    GameContainerComponent,
    GameBoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GameContainerComponent,
    GameBoardComponent
  ]
})

export class GameContainerModule { }
