import { Injectable, Inject } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, withLatestFrom, switchMap } from "rxjs/operators";

import {
  StartGameAction,
  GameActionTypes,
  UpdateGameBoardAction,
  SelectCellAction,
  UpdateCurrentUserIdAction
} from "./game.actions";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { GameBoardToken } from "./game.token";
import { Observable, from } from "rxjs";
import { PlayersEnum } from "../players/players.enum";

const DEFAULT_MATRIX_ROW = 7;
const DEFAULT_MATRIX_COL = 6;

@Injectable()
export class GameEffect {
  @Effect()
  startGame$ = this.actions$.pipe(
    ofType<StartGameAction>(GameActionTypes.StartGame),
    switchMap(_ => {
      return from([
        new UpdateGameBoardAction(
          generateMatrixModel(DEFAULT_MATRIX_ROW, DEFAULT_MATRIX_COL)
        ),
        new UpdateCurrentUserIdAction(PlayersEnum.PlayerOne)
      ]);
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
