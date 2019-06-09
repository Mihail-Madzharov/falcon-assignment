import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameComponent } from "./game.component";
import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { GameBoardToken } from "./store/game.token";
import { DispatcherToken } from "src/app/app.tokens";
@Pipe({
  name: "async"
})
export class AsyncPipeMock implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return [value];
  }
}

describe("GameComponent", () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, AsyncPipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: GameBoardToken, useValue: {} },
        {
          provide: DispatcherToken,
          useValue: () => {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
