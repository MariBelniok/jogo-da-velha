import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPlayersComponent } from './character-players.component';

describe('CharacterPlayersComponent', () => {
  let component: CharacterPlayersComponent;
  let fixture: ComponentFixture<CharacterPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
