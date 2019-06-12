import { AppState } from "./app.state";
import { ShowNotificationAction } from "./app.actions";
import { appReducers } from "./app.reducers";

describe("Gamer reducer", () => {
  let gameState: AppState;
  beforeEach(() => {
    gameState = {
      sweetAlertModel: undefined
    };
  });

  it("should updateGameBoard on update sweet alert options on ShowNotificationAction", () => {
    const updateGameBoardAction = new ShowNotificationAction({
      options: { title: "Mock title" }
    });
    // Act
    const result = appReducers(gameState, updateGameBoardAction);
    // Assert
    expect(result.sweetAlertModel.options).toEqual({ title: "Mock title" });
  });
});
