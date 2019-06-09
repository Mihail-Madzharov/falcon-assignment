import { Injectable, Inject } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, withLatestFrom } from "rxjs/operators";

import {
  StartGameAction,
  GameActionTypes,
  UpdateGameBoardAction,
  SelectCellAction
} from "./game.actions";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { GameBoardToken } from "./game.token";
import { Observable } from "rxjs";
import { checkFour } from "src/app/lib/game-utilities/check-four";
const DEFAULT_MATRIX_ROW = 7;
const DEFAULT_MATRIX_COL = 6;

//  [2, 0, 0, 0, 0, 0, 0]
//  [2, 0, 0, 0, 0, 0, 0]
//  [2, 0, 0, 0, 0, 0, 0]
//  [2, 0, 0, 0, 0, 0, 0]
//  [0, 0, 0, 0, 0, 0, 0]
//  [0, 0, 0, 0, 0, 0, 0]

//  [1, 0, 0, 0, 0, 0, 0]
//  [1, 0, 0, 0, 0, 0, 0]
//  [1, 0, 0, 0, 0, 0, 0]
//  [1, 0, 0, 0, 0, 0, 0]
//  [0, 0, 0, 0, 0, 0, 0]
//  [0, 0, 0, 0, 0, 0, 0]
@Injectable()
export class GameEffect {
  @Effect()
  startGame$ = this.actions$.pipe(
    ofType<StartGameAction>(GameActionTypes.StartGame),
    map(_ => {
      return new UpdateGameBoardAction(
        generateMatrixModel(DEFAULT_MATRIX_ROW, DEFAULT_MATRIX_COL)
      );
    })
  );

  @Effect()
  selectCell$ = this.actions$.pipe(
    ofType<SelectCellAction>(GameActionTypes.SelectCell),
    withLatestFrom(this.gameBoard$),
    map(([action, matrix]) => {
      const row = action.payload.row;
      const col = action.payload.col;
      matrix[row][col] = 1;

      return new UpdateGameBoardAction(matrix);
    })
  );

  constructor(
    private actions$: Actions,
    @Inject(GameBoardToken)
    public gameBoard$: Observable<Matrix>
  ) {}
}
