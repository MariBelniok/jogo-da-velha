import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CharacterPlayersService } from '../characters-players.service';

@Component({
  selector: 'app-character-players-form',
  templateUrl: './character-players-form.component.html',
  styleUrls: ['./character-players-form.component.scss']
})
export class CharacterPlayersFormComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  form: FormGroup;

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
    const searchCharacters: string[] = [this.form.value.playerOne, this.form.value.playerTwo]

    for (const character of searchCharacters) {
      this.characterService.getMarvelCharacterByName(character)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
