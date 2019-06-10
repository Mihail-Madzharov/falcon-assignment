import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"]
})
export class PlayersComponent {
  @Input()
  isGameStarted: boolean;
}
