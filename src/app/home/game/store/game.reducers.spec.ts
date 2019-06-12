import { gameReducer } from "./game.reducers";
import { GameState } from "./game.state";
import {
  UpdateGameBoardAction,
  UpdateCurrentUserIdAction,
  ToggleGameStartAction,
  UpdateLastPlayingPlayer
} from "./game.actions";
import { Matrix } from "src/app/lib/game-utilities/matrix";

describe("Gamer reducer", () => {
  let gameState: GameState;
  beforeEach(() => {
    gameState = {
      gameBoard: [],
      currentUserId: 1,
      secondUserId: 1,
      gameStarted: false,
      lastPlayingPlayer: 1
    };
  });

  it("should updateGameBoard on UpdateGameBoardAction", () => {
    const newMatrix: Matrix = [[1, 2, 3]];
    const updateGameBoardAction = new UpdateGameBoardAction(newMatrix);
    // Act
    const result = gameReducer(gameState, updateGameBoardAction);
    // Assert
    expect(result.gameBoard).toStrictEqual([[1, 2, 3]]);
  });

  it("should update the current user Id on UpdateCurrentUserIdAction", () => {
    // Arrange

    const newUserId = 1;
    const updateCurrentUserIdAction = new UpdateCurrentUserIdAction(newUserId);
    // Act
    const result = gameReducer(gameState, updateCurrentUserIdAction);

    // Assert
    expect(result.currentUserId).toBe(1);
  });

  it("should toggleGameStart on ToggleGameStartAction", () => {
    // Arrange

    const toggleGameStartAction = new ToggleGameStartAction(true);
    // Act
    const result = gameReducer(gameState, toggleGameStartAction);

    // Assert
    expect(result.gameStarted).toBeTruthy();
  });

  it("should update nextPlayerIdTurn on UpdateNextPlayerIdTurnAction", () => {
    // Arrange
    const playerId = 1;
    const toggleGameStartAction = new UpdateLastPlayingPlayer(playerId);
    // Act
    const result = gameReducer(gameState, toggleGameStartAction);

    // Assert
    expect(result.lastPlayingPlayer).toBe(playerId);
  });
});
