import { Component, OnInit, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { Dispatcher } from "src/app/shared/types";

import { Matrix, generateMatrixModel } from "src/app/lib/game-utilities/matrix";
import { DispatcherToken } from "src/app/app.tokens";
import { GameBoardToken } from "./store/game.token";
import { UpdateGameBoardAction } from "./store/game.actions";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  constructor(
    @Inject(GameBoardToken)
    public gameBoard$: Observable<Matrix>,
    @Inject(DispatcherToken)
    private dispatcher: Dispatcher
  ) {}
  ngOnInit() {
    this.dispatcher(new UpdateGameBoardAction(generateMatrixModel(7, 6)));
  }
}
