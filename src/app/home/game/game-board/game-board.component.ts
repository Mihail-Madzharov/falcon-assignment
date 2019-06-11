import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { BoardCell } from "./board-cell";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.scss"]
})
export class GameBoardComponent {
  @Input()
  canUserPlay: boolean;

  @Input()
  public gameBoard: Matrix;

  @Output()
  public selectCell = new EventEmitter<BoardCell>();

  onClickHandler(row: number) {
    // the last index that row with zero will be
    // the place that we want to place the piece
    if (this.canUserPlay) {
      const col = this.gameBoard[row].lastIndexOf(0);
      this.selectCell.emit({ row, col });
    }
  }

  trackByRow(index: number, row: number) {
    return index;
  }
}
