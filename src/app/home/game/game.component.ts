import { Component, OnInit } from "@angular/core";
import { Matrix, generateMatrixModel } from "src/app/lib/game-utilities/matrix";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  public gameBoard: Matrix;

  ngOnInit() {
    this.gameBoard = generateMatrixModel(7, 6);
  }
}
