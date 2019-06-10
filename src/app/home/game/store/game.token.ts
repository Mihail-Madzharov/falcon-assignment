import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

import { Matrix } from "src/app/lib/game-utilities/matrix";

export const GameBoardToken = new InjectionToken<Observable<Matrix>>(
  "This will provide the game board"
);

export const CurrentUserId = new InjectionToken<Observable<number>>(
  "This will provide the current user id"
);

export const SecondUserId = new InjectionToken<Observable<number>>(
  "This will provide the second user id"
);
