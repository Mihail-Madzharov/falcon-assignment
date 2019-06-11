import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

import { Matrix } from "src/app/lib/game-utilities/matrix";

export const GameBoardToken = new InjectionToken<Observable<Matrix>>(
  "This will provide the game board"
);

export const CurrentUserIdToken = new InjectionToken<Observable<number>>(
  "This will provide the current user id"
);

export const SecondUserIdToken = new InjectionToken<Observable<number>>(
  "This will provide the second user id"
);

export const GameStartedToken = new InjectionToken<Observable<boolean>>(
  "This will provide the game started state"
);

export const LastPlayingPlayerId = new InjectionToken<Observable<number>>(
  "This will provide the last playing player id"
);
