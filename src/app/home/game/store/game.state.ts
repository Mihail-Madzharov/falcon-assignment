import { Matrix } from "src/app/lib/game-utilities/matrix";

export class GameState {
  static stateName = "GameState";
  public gameBoard: Matrix;
  public currentUserId: number;
  public secondUserId: number;
  public gameStarted: boolean;
}
