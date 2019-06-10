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
import { gameBoardSelector } from "./game/store/game.selectors";
import { GameBoardToken } from "./game/store/game.token";
import { PlayersComponent } from "./game/players/players.component";

@NgModule({
  declarations: [
    GameComponent,
    HomeComponent,
    GameBoardComponent,
    PlayersComponent
  ],
  providers: [
    {
      provide: GameBoardToken,
      useFactory: store => store.select(gameBoardSelector),
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
