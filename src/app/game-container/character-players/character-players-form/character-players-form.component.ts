import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { CharacterPlayersService } from '../characters-players.service';

@Component({
  selector: 'app-character-players-form',
  templateUrl: './character-players-form.component.html',
  styleUrls: ['./character-players-form.component.scss']
})
export class CharacterPlayersFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  loadingCharacters: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterPlayersService  
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      playerOne: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      playerTwo: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    })
  }

  onStartGame() {
    this.loadingCharacters = true;
    this.chooseRandomCharacters();
  }

  chooseRandomCharacters() {
    const playerX = Math.random() > 0.5 ? this.form.value.playerOne : this.form.value.playerTwo;
    const playerO = playerX === this.form.value.playerOne ? this.form.value.playerTwo : this.form.value.playerOne ;
  
    this.searchCharacters(playerX, playerO);
  }

  searchCharacters(playerX: string, playerO: string): void {
    this.characterService.getMarvelCharacterByName(playerX)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.characterService.getMarvelCharacterByName(playerO)
        }),
        finalize(() => this.loadingCharacters = false)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
