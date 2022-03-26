import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CharacterPlayersService } from '../characters-players.service';

import { CharacterPlayersFormComponent } from './character-players-form.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('CharacterPlayersFormComponent', () => {
  let component: CharacterPlayersFormComponent;
  let fixture: ComponentFixture<CharacterPlayersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPlayersFormComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, FormsModule, ReactiveFormsModule],
      providers: [FormBuilder, CharacterPlayersService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPlayersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form be invalid when fields are not filled', () => {
    expect(component.form.valid).toBeFalsy();
  })

  it('should form be valid when fields are filled', () => {
    component.form.patchValue({
      playerOne: 'hulk',
      playerTwo: 'thor'
    });

    expect(component.form.valid).toBeTruthy();
  })

  it('should disable button when inputs are invalid', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  })

  it('should enable button when inputs are valid', () => {
    component.form.patchValue({
      playerOne: 'hulk',
      playerTwo: 'thor'
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disable).toBeFalsy();
  });

  it('should fetch characters when on start button is clicked', () => {
    const onStartGameSpy = spyOn(component, 'onStartGame');
    const button = fixture.nativeElement.querySelector('button');
    component.form.patchValue({
      playerOne: 'hulk',
      playerTwo: 'thor'
    });

    fixture.detectChanges();
    button.click();

    expect(onStartGameSpy).toHaveBeenCalled();
  });
});
