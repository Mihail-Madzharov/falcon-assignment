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
  secondUserId
} from "./game/store/game.selectors";
import {
  GameBoardToken,
  CurrentUserId,
  SecondUserId
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
      provide: CurrentUserId,
      useFactory: store => store.select(currentUserIdSelector),
      deps: [Store]
    },
    {
      provide: SecondUserId,
      useFactory: store => store.select(secondUserId),
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
