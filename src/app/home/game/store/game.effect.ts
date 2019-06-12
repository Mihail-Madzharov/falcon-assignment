import { Injectable, Inject } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { withLatestFrom, switchMap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Observable, from } from "rxjs";

import { Winner } from "src/app/shared/winner";
import {
  StartGameAction,
  GameActionTypes,
  UpdateGameBoardAction,
  SelectCellAction,
  UpdateLastPlayingPlayer,
  UpdateWinnerIdAction
} from "./game.actions";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { GameBoardToken, CurrentUserIdToken } from "./game.token";
import { WebSocketService } from "../../web-socket.service";
import { checkFour } from "src/app/lib/game-utilities/check-four";
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
        )
      ]);
    })
  );

  @Effect()
  selectCell$ = this.actions$.pipe(
    ofType<SelectCellAction>(GameActionTypes.SelectCell),
    withLatestFrom(this.gameBoard$, this.currentUserId$),
    switchMap(([action, matrix, currentUserId]) => {
      const row = action.payload.row;
      const col = action.payload.col;
      // first we select the cell
      matrix[row][col] = currentUserId;

      // then we check if the game is over
      const result: Winner = checkFour(currentUserId, matrix, [col, row]);

      const actions: Action[] = [
        new UpdateGameBoardAction(matrix),
        new UpdateLastPlayingPlayer(currentUserId)
      ];

      // if the game is over we want to show it to the user
      if (result && result.pieces) {
        result.pieces.forEach(([winningRow, winningCol]) => {
          matrix[winningCol][winningRow] = PlayersEnum.Winner;
        });

        actions.push(new UpdateWinnerIdAction(result.playerId));

        this.webSockets.send(new UpdateWinnerIdAction(result.playerId));
      }

      this.webSockets.send(new UpdateGameBoardAction(matrix));
      this.webSockets.send(new UpdateLastPlayingPlayer(currentUserId));

      return actions;
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
