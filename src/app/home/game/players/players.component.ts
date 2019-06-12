import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PlayersEnum } from "./players.enum";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent {
  public PLAYER_ONE_ID: number;
  public PLAYER_TWO_ID: number;
  public NO_PLAYER_SELECTED_ID: number;
  @Input()
  gameStarted: boolean;

  @Output()
  startGame = new EventEmitter<boolean>();

  @Output()
  newGame = new EventEmitter();

  @Output()
  leaveGame = new EventEmitter();

  @Output()
  joinGame = new EventEmitter();

  @Input()
  secondUserId: number;

  @Input()
  currentUserId: number;

  @Input()
  lastPlayingPlayerId: number;

  @Input()
  winnerId: number;

  constructor() {
    this.PLAYER_ONE_ID = PlayersEnum.PlayerOne;
    this.PLAYER_TWO_ID = PlayersEnum.PlayerTwo;
    this.NO_PLAYER_SELECTED_ID = PlayersEnum.NoPlayerSelectedId;
  }

  onStartGameHandler() {
    this.startGame.emit();
  }

  onJoinGame() {
    this.joinGame.emit();
  }

  calculateSecondUserSubLabel() {
    if (
      this.secondUserId === this.NO_PLAYER_SELECTED_ID &&
      this.currentUserId === this.PLAYER_ONE_ID
    ) {
      return "(waiting to join)";
    }

    if (this.currentUserId === this.PLAYER_TWO_ID) {
      return "(you)";
    }
  }

  calculateCurrentUserSubLabel() {
    if (this.secondUserId !== this.NO_PLAYER_SELECTED_ID && !this.gameStarted) {
      return "(waiting for you to join)";
    }

    if (this.currentUserId === this.PLAYER_ONE_ID) {
      return "(you)";
    }
  }

  onNewGameClickHandler() {
    this.newGame.emit();
  }

  onLeaveClickHandler() {
    this.leaveGame.emit();
  }
}
