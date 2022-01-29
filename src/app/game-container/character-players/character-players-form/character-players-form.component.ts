import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CharacterPlayersService } from '../characters-players.service';

@Component({
  selector: 'app-character-players-form',
  templateUrl: './character-players-form.component.html',
  styleUrls: ['./character-players-form.component.scss']
})
export class CharacterPlayersFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private characterService: CharacterPlayersService  
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      playerOne: [null, [Validators.required]],
      playerTwo: [null, [Validators.required]]
    })
  }

  onSearchCharacters(): void {
    const playerX = this.form.value.playerOne;
    const playerO = this.form.value.playerTwo;

    this.characterService.getMarvelCharacterByName(playerX)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => {
          return this.characterService.getMarvelCharacterByName(playerO)
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
