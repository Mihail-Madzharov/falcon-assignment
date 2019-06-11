import { Injectable, Inject } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { map, withLatestFrom, switchMap, tap } from "rxjs/operators";

import {
  StartGameAction,
  GameActionTypes,
  UpdateGameBoardAction,
  SelectCellAction
} from "./game.actions";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { GameBoardToken, CurrentUserIdToken } from "./game.token";
import { Observable, from } from "rxjs";
import { PlayersEnum } from "../players/players.enum";
import { WebSocketService } from "../../web-socket.service";

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
        )
      ]);
    })
  );

  @Effect()
  selectCell$ = this.actions$.pipe(
    ofType<SelectCellAction>(GameActionTypes.SelectCell),
    withLatestFrom(this.gameBoard$, this.currentUserId$),
    map(([action, matrix, currentUserId]) => {
      const row = action.payload.row;
      const col = action.payload.col;
      matrix[row][col] = currentUserId;

      this.webSockets.send(new UpdateGameBoardAction(matrix));
      return new UpdateGameBoardAction(matrix);
    })
  );

  constructor(
    private actions$: Actions,
    @Inject(GameBoardToken)
    public gameBoard$: Observable<Matrix>,
    @Inject(CurrentUserIdToken)
    private currentUserId$: Observable<number>,
    private webSockets: WebSocketService
  ) {}
}
