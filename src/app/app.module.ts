import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GameContainerModule } from './game-container/game-container.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GameContainerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
