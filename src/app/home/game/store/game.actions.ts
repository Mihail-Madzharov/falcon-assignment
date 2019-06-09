import { Action } from "@ngrx/store";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "../game-board/board-cell";

export const GameActionTypes = {
  StartGame: "[GAME] This will start the game",
  UpdateGameBoard: "[GAME] This will update the game board matrix",
  SelectCell: "[GAME] This will select a cell"
};

export class StartGameAction implements Action {
  readonly type: string = GameActionTypes.StartGame;
}

export class SelectCellAction implements Action {
  readonly type: string = GameActionTypes.SelectCell;
  constructor(public payload: BoardCell) {}
}

export class UpdateGameBoardAction implements Action {
  readonly type: string = GameActionTypes.UpdateGameBoard;
  constructor(public payload: Matrix) {}
}
