import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameContainerService } from '../game-container.service';

import { GameBoardComponent } from './game-board.component';

fdescribe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameBoardComponent ],
      providers: [ GameContainerService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark space with X or O', () => {
    const spy = spyOn(component, 'markSpace');
    const space = fixture.nativeElement.querySelector('.space');
    space.click();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should have a winner when possible index combinations matches', () => {
    component.currentPlayerIsX = false;
    component.gameBoardSpaces = ['X', 'X', 'X'];

    const space = fixture.nativeElement.querySelector('.space');
    space.click();

    fixture.detectChanges();

    expect(component.winner).toBe('X');
  });

  it('should show winner', () => {
    component.currentPlayerIsX = false;
    component.gameBoardSpaces = ['X', 'X', 'X'];
    const space = fixture.nativeElement.querySelector('.space');
    space.click();

    fixture.detectChanges();

    const winner = fixture.nativeElement.querySelector('.showWinner');

    expect(component.winner).toBe('X');
    expect(winner).toBeDefined();
  });


  it('should show tie', () => {
    component.movesCounter = 9;
    component.gameBoardSpaces = [
      'X', 'O', 'X',
      'O', 'O', 'X',
      'X', 'X', 'O'
    ];
    const space = fixture.nativeElement.querySelector('.space');
    space.click();

    fixture.detectChanges();

    const winner = fixture.nativeElement.querySelector('.showWinner');

    expect(component.winner).toBe('Tie');
    expect(winner).toBeDefined();
  });
});
