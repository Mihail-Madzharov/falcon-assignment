import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayersComponent } from "./players.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler/src/core";
import { PlayersEnum } from "./players.enum";

describe("PlayersComponent", () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("calculateSecondUserSubLabel", () => {
    it("should return (waiting to join) when the secondUserId is NO_PLAYER_SELECTED_ID and the currentUser is PLAYER_ONE_ID ", () => {
      // Arrange
      component.currentUserId = PlayersEnum.PlayerOne;
      component.secondUserId = PlayersEnum.NoPlayerSelectedId;
      // Act
      const result = component.calculateSecondUserSubLabel();
      // Assert
      expect(result).toBe("(waiting to join)");
    });

    it("should return (you) if the currentUserId equals PLAYER_TWO_ID", () => {
      // Arrange

      component.currentUserId = PlayersEnum.PlayerTwo;
      // Act
      const result = component.calculateSecondUserSubLabel();

      // Assert
      expect(result).toBe("(you)");
    });

    describe("calculateCurrentUserSubLabel", () => {
      it(`should return (waiting for you to join) when secondUserId is different
       NO_PLAYER_SELECTED_ID and gameStarted is false`, () => {
        // Arrange
        component.gameStarted = false;
        component.secondUserId = PlayersEnum.PlayerTwo;

        // Act
        const result = component.calculateCurrentUserSubLabel();

        // Assert
        expect(result).toBe("(waiting for you to join)");
      });

      it("should return (you) when currentUserId is PLAYER_ONE_ID", () => {
        // Arrange
        component.currentUserId = PlayersEnum.PlayerOne;
        component.secondUserId = PlayersEnum.NoPlayerSelectedId;

        // Act
        const result = component.calculateCurrentUserSubLabel();

        // Assert
        expect(result).toBe("(you)");
      });
    });

    describe("onJoinGame", () => {
      it("should emit joinGame onJoinGame", () => {
        // Arrange
        const mockEmit = jest.fn();
        component.joinGame.emit = mockEmit;

        // Act
        component.onJoinGame();

        // Assert

        expect(mockEmit).toHaveBeenCalled();
      });
    });

    describe("onStartGameHandler", () => {
      it("should emit startGame", () => {
        // Arrange
        const mockEmit = jest.fn();
        component.startGame.emit = mockEmit;

        // Act
        component.onStartGameHandler();

        // Assert

        expect(mockEmit).toHaveBeenCalled();
      });
    });
  });
});
