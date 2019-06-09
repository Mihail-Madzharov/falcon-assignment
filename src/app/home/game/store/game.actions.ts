import { Action } from "@ngrx/store";
import { Matrix } from "src/app/lib/game-utilities/matrix";

export const GameActionTypes = {
  StartGame: "[GAME] This will start the game",
  UpdateGameBoard: "[GAME] This will update the game board matrix"
};

export class StartGameAction implements Action {
  readonly type: string = GameActionTypes.StartGame;
}

export class UpdateGameBoardAction implements Action {
  readonly type: string = GameActionTypes.UpdateGameBoard;
  constructor(public payload: Matrix) {}
}
