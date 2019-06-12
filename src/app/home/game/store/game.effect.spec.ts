import { cold, hot } from "jasmine-marbles";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { empty, Observable, BehaviorSubject } from "rxjs";

import { GameEffect } from "./game.effect";
import {
  StartGameAction,
  UpdateGameBoardAction,
  SelectCellAction,
  UpdateLastPlayingPlayer,
  GameActionTypes
} from "./game.actions";
import { GameBoardToken, CurrentUserIdToken } from "./game.token";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { WebSocketService } from "../../web-socket.service";

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe("GameEffect", () => {
  let actions: TestActions;
  let effects: GameEffect;
  let gameBoard: BehaviorSubject<Matrix>;
  let currentUserId$: BehaviorSubject<number>;
  let matrix: Matrix;
  beforeEach(() => {
    matrix = generateMatrixModel(7, 6);
    gameBoard = new BehaviorSubject(matrix);
    currentUserId$ = new BehaviorSubject(-1);
    TestBed.configureTestingModule({
      providers: [
        GameEffect,
        {
          provide: Actions,
          useFactory: getActions
        },
        {
          provide: GameBoardToken,
          useValue: gameBoard
        },
        {
          provide: CurrentUserIdToken,
          useValue: currentUserId$
        },
        {
          provide: WebSocketService,
          useValue: {
            send: jest.fn()
          }
        }
      ]
    });
    actions = TestBed.get(Actions);
    effects = TestBed.get(GameEffect);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("startGame", () => {
    it("should return an AddUserSuccess action, with the user, on success", () => {
      // Arrange
      const action = new StartGameAction();
      const updateGameBoard = new UpdateGameBoardAction(matrix);
      actions.stream = hot("a", { a: action });
      const expected = cold("b", { b: updateGameBoard });

      // Assert
      expect(effects.startGame$).toBeObservable(expected);
    });
  });

  describe("selectCell", () => {
    it("should select cell by replacing the cell with the current user id", () => {
      // Arrange WebSocketService
      const webService: WebSocketService = TestBed.get(WebSocketService);
      const actionContainer = [];
      webService.send = action => actionContainer.push(action);

      // Arrange effect
      const action = new SelectCellAction({ col: 0, row: 0 });
      const currentUserId = 1;
      matrix[0][0] = currentUserId;

      const updateGameBoard = new UpdateGameBoardAction(matrix);

      const currentUserAction = new UpdateLastPlayingPlayer(currentUserId);

      actions.stream = hot("a", { a: action });

      const expected = cold("(bc)", {
        b: updateGameBoard,
        c: currentUserAction
      });

      // Act

      currentUserId$.next(currentUserId);

      // Assert
      expect(effects.selectCell$).toBeObservable(expected);
      expect(actionContainer[0].type).toBe(GameActionTypes.UpdateGameBoard);
      expect(actionContainer[0].payload).toStrictEqual(matrix);
      expect(actionContainer[1].type).toBe(
        GameActionTypes.UpdateLastPlayingPlayer
      );
      expect(actionContainer[1].payload).toBe(currentUserId);
    });
  });
});
