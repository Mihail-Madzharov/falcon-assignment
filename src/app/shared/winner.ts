import { Matrix } from "../lib/game-utilities/matrix";

export interface Winner {
  playerId: number;
  pieces: Matrix;
}
