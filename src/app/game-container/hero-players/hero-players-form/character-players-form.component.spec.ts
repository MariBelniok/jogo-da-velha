import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPlayersFormComponent } from './character-players-form.component';

describe('CharacterPlayersFormComponent', () => {
  let component: CharacterPlayersFormComponent;
  let fixture: ComponentFixture<CharacterPlayersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPlayersFormComponent ]
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
});
