import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameComponent } from "./game/game.component";
import { HomeComponent } from "./home.component";

@NgModule({
  declarations: [GameComponent, HomeComponent],
  imports: [CommonModule]
})
export class HomeModule {}
