import { Component, Input } from "@angular/core";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"]
})
export class AvatarComponent {
  @Input()
  isCurrentPlayer: boolean;

  @Input()
  label: string;

  @Input()
  subtitle: string;
}
