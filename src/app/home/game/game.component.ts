import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Dispatcher } from "src/app/shared/types";
import { tap, takeUntil } from "rxjs/operators";

import { Matrix } from "src/app/lib/game-utilities/matrix";
import { DispatcherToken } from "src/app/app.tokens";
import {
  GameBoardToken,
  CurrentUserIdToken,
  SecondUserIdToken,
  GameStartedToken
} from "./store/game.token";
import {
  StartGameAction,
  SelectCellAction,
  UpdateSecondUserId,
  UpdateCurrentUserIdAction
} from "./store/game.actions";
import { BoardCell } from "./game-board/board-cell";
import { PlayersEnum } from "./players/players.enum";
import { WebSocketService } from "../web-socket.service";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  constructor(
    @Inject(GameBoardToken)
    public gameBoard$: Observable<Matrix>,
    @Inject(DispatcherToken)
    private dispatcher: Dispatcher,
    @Inject(CurrentUserIdToken)
    public currentUserId$: Observable<number>,
    @Inject(SecondUserIdToken)
    public secondUserId$: Observable<number>,
    private webSockets: WebSocketService,
    @Inject(GameStartedToken)
    public gameStarted$: Observable<boolean>
  ) {}

  ngOnInit(): void {
    this.webSockets.createWebSocketConnection();

    this.webSockets
      .getDownstream()
      .pipe(
        takeUntil(this.destroy$),
        tap(event => {
          if (event.data.message.globalType != null) {
            this.dispatcher(event.data.message);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onStartGameClickHandler() {
    this.webSockets.send(new StartGameAction(true));
    this.webSockets.send(new UpdateSecondUserId(PlayersEnum.PlayerOne));

    this.dispatcher(new StartGameAction(true));
    this.dispatcher(new UpdateCurrentUserIdAction(PlayersEnum.PlayerOne));
  }

  onCellSelect(cell: BoardCell) {
    this.webSockets.send(new SelectCellAction(cell));

    this.dispatcher(new SelectCellAction(cell));
  }

  onJoinGame() {
    this.webSockets.send(new UpdateSecondUserId(PlayersEnum.PlayerOne));
    this.dispatcher(new UpdateCurrentUserIdAction(PlayersEnum.PlayerTwo));
  }
}
