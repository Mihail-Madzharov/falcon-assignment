import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

import { Matrix } from "src/app/lib/game-utilities/matrix";

export const GameBoardToken = new InjectionToken<Observable<Matrix>>(
  "This will the game board"
);
