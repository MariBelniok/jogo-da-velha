import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GameContainerComponent } from './game-container.component';
import { GameContainerService } from './game-container.service';
import { GameScoreModel } from './models/game-score.model';

const gameContainerServiceMock = {
  gameScore$: of({
    playerX: 2,
    playerO: 1,
    tie: 3
  }),
}

fdescribe('GameContainerComponent', () => {
  let component: GameContainerComponent;
  let fixture: ComponentFixture<GameContainerComponent>;
  let service: GameContainerService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ GameContainerComponent ],
      providers: [{ provide: GameContainerService, useValue: gameContainerServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContainerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GameContainerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request game score on component initiation', async () => {
    fixture.detectChanges();
    await fixture.whenStable().then(() => {
      expect(component.gameScore.playerX).toBe(2);
      expect(component.gameScore.playerO).toBe(1);
      expect(component.gameScore.tie).toBe(3);
    })
  });
});
