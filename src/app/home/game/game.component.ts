import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Dispatcher } from "src/app/shared/types";

import { Matrix } from "src/app/lib/game-utilities/matrix";
import { DispatcherToken } from "src/app/app.tokens";
import {
  GameBoardToken,
  CurrentUserId,
  SecondUserId
} from "./store/game.token";
import {
  StartGameAction,
  SelectCellAction,
  UpdateSecondUserId
} from "./store/game.actions";
import { BoardCell } from "./game-board/board-cell";
import { PlayersEnum } from "./players/players.enum";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent {
  constructor(
    @Inject(GameBoardToken)
    public gameBoard$: Observable<Matrix>,
    @Inject(DispatcherToken)
    private dispatcher: Dispatcher,
    @Inject(CurrentUserId)
    public currentUserId$: Observable<number>,
    @Inject(SecondUserId)
    public secondUserId$: Observable<number>
  ) {}

  onStartGameClickHandler() {
    this.dispatcher(new StartGameAction());
  }

  onCellSelect(cell: BoardCell) {
    this.dispatcher(new SelectCellAction(cell));
  }

  onJoinGame() {
    this.dispatcher(new UpdateSecondUserId(PlayersEnum.PlayerTwo));
  }
}
