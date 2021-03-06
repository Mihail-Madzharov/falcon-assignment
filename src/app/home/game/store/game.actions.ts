import { Action } from "@ngrx/store";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "../game-board/board-cell";
import { GlobalAction } from "src/app/shared/global-action";
import { GameState } from "./game.state";

export const GameActionTypes = {
  StartGame: "[GAME] This will start the game",
  UpdateGameBoard: "[GAME] This will update the game board matrix",
  SelectCell: "[GAME] This will select a cell",
  UpdateCurrentUserId: "[GAME] This will update current user Id",
  UpdateSecondUserId: "[GAME] This will update the second user Id",
  ToggleStartGame: "[Game] This will toggle the start game state",
  UpdateLastPlayingPlayer: "[Game] This will update the next player id",
  UpdateWinnerId: "[Game] Update game winner",
  ResetGameState: "[Game] Reset game state",
  StartNewGame: "[Game] This will start a new game",
  UpdateHoleState: "[Game] This will update the hole state of the game"
};

export class StartGameAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.StartGame;
  constructor() {
    super();
  }
}

export class ToggleGameStartAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.ToggleStartGame;
  constructor(public payload: boolean) {
    super();
  }
}
export class SelectCellAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.SelectCell;
  constructor(public payload: BoardCell) {
    super();
  }
}

export class UpdateGameBoardAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateGameBoard;
  constructor(public payload: Matrix) {
    super();
  }
}

export class UpdateCurrentUserIdAction implements Action {
  readonly type: string = GameActionTypes.UpdateCurrentUserId;
  constructor(public payload: number) {}
}

export class UpdateSecondUserId extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateSecondUserId;
  constructor(public payload: number) {
    super();
  }
}

export class UpdateLastPlayingPlayer extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateLastPlayingPlayer;
  constructor(public payload: number) {
    super();
  }
}

export class UpdateWinnerIdAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateWinnerId;
  constructor(public payload: number) {
    super();
  }
}

export class ResetGameStateAction extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.ResetGameState;
}
export class StartNewGame extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.StartNewGame;
}

export class UpdateState extends GlobalAction implements Action {
  readonly type: string = GameActionTypes.UpdateHoleState;
  constructor(public payload: GameState) {
    super();
  }
}
