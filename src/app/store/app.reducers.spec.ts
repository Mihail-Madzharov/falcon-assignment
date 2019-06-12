import { Matrix } from "src/app/lib/game-utilities/matrix";
import { AppState } from "./app.state";
import { UpdateSweetAlertOptions } from "./app.actions";

describe("Gamer reducer", () => {
  let gameState: AppState;
  beforeEach(() => {
    gameState = {
      sweetAlertOptions: {}
    };
  });

  it("should updateGameBoard on UpdateGameBoardAction", () => {
    const updateGameBoardAction = new UpdateSweetAlertOptions({});
    // Act
    const result = gameReducer(gameState, updateGameBoardAction);
    // Assert
    expect(result).toStrictEqual([[1, 2, 3]]);
  });
});
