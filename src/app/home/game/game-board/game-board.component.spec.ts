import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameBoardComponent } from "./game-board.component";

describe("GameBoardComponent", () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameBoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("onClick handler", () => {
    it("should emit row and col onClickHandler", () => {
      // Arrange
      component.gameBoard = [[0]];
      component.canUserPlay = true;
      const spy = spyOn(component.selectCell, "emit");
      // Act
      component.onClickHandler(0);

      // Assert
      expect(spy).toHaveBeenCalledWith({ row: 0, col: 0 });
    });

    it("should emit col index where the first col value is 0 when canUserPlay is true", () => {
      // Arrange
      component.gameBoard = [[1, 1, 1, 0]];
      component.canUserPlay = true;
      const spy = spyOn(component.selectCell, "emit");
      // Act
      component.onClickHandler(0);

      // Assert
      expect(spy).toHaveBeenCalledWith({ row: 0, col: 3 });
    });

    it("should not emit col index if canUserPlay if false", () => {
      // Arrange
      component.gameBoard = [[1, 1, 1, 0]];
      component.canUserPlay = false;
      const spy = spyOn(component.selectCell, "emit");
      // Act
      component.onClickHandler(0);

      // Assert
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
