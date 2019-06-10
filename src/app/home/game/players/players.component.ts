import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent {
  @Output()
  startGame = new EventEmitter<boolean>();

  @Output()
  joinGame = new EventEmitter();

  @Input()
  secondUserId: number;

  @Input()
  currentUserId: number;

  onStartGameHandler() {
    this.startGame.emit();
  }

  onJoinGame() {
    this.joinGame.emit();
  }
}
