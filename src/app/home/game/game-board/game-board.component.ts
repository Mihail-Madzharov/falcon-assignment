import { Component, OnInit } from "@angular/core";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.scss"]
})
export class GameBoardComponent implements OnInit {
  public gameBoard: Matrix;
  constructor() {
    this.gameBoard = generateMatrixModel(7, 6);
  }

  ngOnInit() {}

  onClickHandler(row) {
    const col = this.gameBoard[row].findIndex(value => value === 0);
    this.gameBoard[row][col] = 1;
  }
}
