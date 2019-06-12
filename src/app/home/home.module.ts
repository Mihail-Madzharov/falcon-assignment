import { NgModule } from "@angular/core";
import { StoreModule, Store } from "@ngrx/store";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";

import { GameComponent } from "./game/game.component";
import { HomeComponent } from "./home.component";
import { GameBoardComponent } from "./game/game-board/game-board.component";
import { GameEffect } from "./game/store/game.effect";
import { GameState } from "./game/store/game.state";
import { gameReducer } from "./game/store/game.reducers";
import {
  gameBoardSelector,
  currentUserIdSelector,
  secondUserId,
  gameStarted,
  lastPlayingPlayerId,
  winnerId
} from "./game/store/game.selectors";
import {
  GameBoardToken,
  CurrentUserIdToken,
  SecondUserIdToken,
  GameStartedToken,
  LastPlayingPlayerId,
  WinnerIdToken
} from "./game/store/game.token";
import { PlayersComponent } from "./game/players/players.component";
import { AvatarComponent } from "./game/players/avatar/avatar.component";

@NgModule({
  declarations: [
    GameComponent,
    HomeComponent,
    GameBoardComponent,
    PlayersComponent,
    AvatarComponent
  ],
  providers: [
    {
      provide: GameBoardToken,
      useFactory: store => store.select(gameBoardSelector),
      deps: [Store]
    },
    {
      provide: CurrentUserIdToken,
      useFactory: store => store.select(currentUserIdSelector),
      deps: [Store]
    },
    {
      provide: SecondUserIdToken,
      useFactory: store => store.select(secondUserId),
      deps: [Store]
    },
    {
      provide: GameStartedToken,
      useFactory: store => store.select(gameStarted),
      deps: [Store]
    },
    {
      provide: LastPlayingPlayerId,
      useFactory: store => store.select(lastPlayingPlayerId),
      deps: [Store]
    },
    {
      provide: WinnerIdToken,
      useFactory: store => store.select(winnerId),
      deps: [Store]
    }
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GameEffect]),
    StoreModule.forFeature(GameState.stateName, gameReducer)
  ]
})
export class HomeModule {}
