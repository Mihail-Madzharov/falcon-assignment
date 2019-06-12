import { gameReducer } from "./game.reducers";
import { GameState } from "./game.state";
import {
  UpdateGameBoardAction,
  UpdateCurrentUserIdAction,
  ToggleGameStartAction,
  UpdateLastPlayingPlayer,
  StartNewGame,
  UpdateWinnerIdAction,
  ResetGameStateAction
} from "./game.actions";
import { Matrix } from "src/app/lib/game-utilities/matrix";
import { PlayersEnum } from "../players/players.enum";

describe("Gamer reducer", () => {
  let gameState: GameState;
  beforeEach(() => {
    gameState = {
      gameBoard: [],
      currentUserId: PlayersEnum.NoPlayerSelectedId,
      secondUserId: PlayersEnum.NoPlayerSelectedId,
      gameStarted: false,
      lastPlayingPlayer: PlayersEnum.NoPlayerSelectedId,
      winnerId: null
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

  it("should update the winnerId on UpdateWinnerIdAction", () => {
    // Arrange
    const playerId = 1;
    const toggleGameStartAction = new UpdateWinnerIdAction(playerId);
    // Act
    const result = gameReducer(gameState, toggleGameStartAction);

    // Assert
    expect(result.winnerId).toBe(playerId);
  });

  it("should update reset the state on ResetGameState", () => {
    // Arrange
    const initialState = Object.assign({}, { ...gameState });
    gameState.lastPlayingPlayer = 1;

    // Act
    const result = gameReducer(gameState, new ResetGameStateAction());

    // Assert
    expect(result).toEqual(initialState);
  });

  it(`should start a new game by preserving
     the currentUserId the secondUserId and gameStarted to true`, () => {
    // Arrange
    const startNewGameAction = new StartNewGame();
    gameState.currentUserId = 1;
    gameState.secondUserId = 2;
    gameState.gameStarted = true;
    // Act
    const result = gameReducer(gameState, startNewGameAction);

    // Assert
    expect(result.currentUserId).toBe(1);
    expect(result.secondUserId).toBe(2);
    expect(result.gameStarted).toBeTruthy();
  });
});
