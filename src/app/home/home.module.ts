import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./game/game.component";
import { HomeComponent } from "./home.component";
import { GameBoardComponent } from "./game/game-board/game-board.component";

@NgModule({
  declarations: [GameComponent, HomeComponent, GameBoardComponent],
  imports: [CommonModule]
})
export class HomeModule {}
