import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { generateMatrixModel, Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "./board-cell";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.scss"]
})
export class GameBoardComponent {
  @Input()
  public gameBoard: Matrix;

  @Output()
  public selectCell = new EventEmitter<BoardCell>();

  onClickHandler(row: number) {
    const col = this.gameBoard[row].findIndex(value => value === 0);
    this.selectCell.emit({ row, col });
  }
}
