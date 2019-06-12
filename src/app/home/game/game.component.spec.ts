import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { of, Subject } from "rxjs";

import { GameComponent } from "./game.component";
import {
  GameBoardToken,
  CurrentUserIdToken,
  SecondUserIdToken,
  GameStartedToken,
  LastPlayingPlayerId,
  WinnerIdToken
} from "./store/game.token";
import { DispatcherToken } from "src/app/app.tokens";
import { WebSocketService } from "../web-socket.service";
import { GameActionTypes } from "./store/game.actions";
import { PlayersEnum } from "./players/players.enum";
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
    const dispatcher = jest.fn();

    TestBed.configureTestingModule({
      declarations: [GameComponent, AsyncPipeMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: GameBoardToken, useValue: {} },
        {
          provide: DispatcherToken,
          useValue: dispatcher
        },
        {
          provide: CurrentUserIdToken,
          useValue: () => {}
        },
        {
          provide: SecondUserIdToken,
          useValue: () => {}
        },
        {
          provide: GameStartedToken,
          useValue: () => {}
        },
        {
          provide: LastPlayingPlayerId,
          useValue: () => {}
        },
        {
          provide: WinnerIdToken,
          useValue: () => {}
        },
        WebSocketService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("", () => {
    it(`should dispatch action to start the game and
  send actions through the websocket to update the other user state`, () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };

      const webSocketsActionContainers = [];
      const mockWebSocketService = {
        send: action => {
          webSocketsActionContainers.push(action);
        }
      };
      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .mockWebSocketService(mockWebSocketService)
        .build();

      // Act
      comp.onStartGameClickHandler();

      // webSocket Assert
      expect(webSocketsActionContainers[0].type).toBe(
        GameActionTypes.StartGame
      );
      expect(webSocketsActionContainers[1].type).toBe(
        GameActionTypes.UpdateSecondUserId
      );
      expect(webSocketsActionContainers[1].payload).toBe(PlayersEnum.PlayerOne);

      // Dispatcher Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.StartGame
      );
      expect(dispatcherActionContainers[1].type).toBe(
        GameActionTypes.UpdateCurrentUserId
      );
      expect(dispatcherActionContainers[1].payload).toBe(PlayersEnum.PlayerOne);
    });
  });

  describe("onCellSelect", () => {
    it(`should dispatch action for selecting a cell and call send function of the webSocketService to update the selected cell`, () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };

      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .build();

      // Act
      comp.onCellSelect({ col: 1, row: 1 });

      // Dispatcher Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.SelectCell
      );
      expect(dispatcherActionContainers[0].payload).toEqual({ col: 1, row: 1 });
    });
  });

  describe("onJoinGame", () => {
    it(`should dispatch action for joining a game and call send function of the webSocketService to notify the other user`, () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };

      const webSocketsActionContainers = [];
      const mockWebSocketService = {
        send: action => {
          webSocketsActionContainers.push(action);
        }
      };
      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .mockWebSocketService(mockWebSocketService)
        .build();

      // Act
      comp.onJoinGame();

      // webSocket Assert
      expect(webSocketsActionContainers[0].type).toBe(
        GameActionTypes.ToggleStartGame
      );
      expect(webSocketsActionContainers[0].payload).toBeTruthy();

      expect(webSocketsActionContainers[1].type).toBe(
        GameActionTypes.UpdateSecondUserId
      );
      expect(webSocketsActionContainers[1].payload).toEqual(
        PlayersEnum.PlayerTwo
      );

      expect(webSocketsActionContainers[2].type).toBe(
        GameActionTypes.UpdateLastPlayingPlayer
      );
      expect(webSocketsActionContainers[2].payload).toEqual(
        PlayersEnum.PlayerTwo
      );

      // Dispatcher Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.ToggleStartGame
      );
      expect(dispatcherActionContainers[0].payload).toBeTruthy();
      expect(dispatcherActionContainers[1].type).toBe(
        GameActionTypes.UpdateCurrentUserId
      );
      expect(dispatcherActionContainers[1].payload).toEqual(
        PlayersEnum.PlayerTwo
      );
      expect(dispatcherActionContainers[2].type).toBe(
        GameActionTypes.UpdateLastPlayingPlayer
      );
      expect(dispatcherActionContainers[2].payload).toEqual(
        PlayersEnum.PlayerTwo
      );
    });
  });

  describe("ngOnInit", () => {
    it("should call createWebsocketConnection on init", () => {
      // Arrange
      const createConnectionSpy = jest.fn();
      const mockWebSocketService = {
        createWebSocketConnection: createConnectionSpy,
        getDownstream: action => of()
      };

      const comp = setup()
        .default()
        .mockWebSocketService(mockWebSocketService)
        .build();
      // Act

      comp.ngOnInit();

      // Assert
      expect(createConnectionSpy).toHaveBeenCalled();
    });

    it("should dispatch action coming from the downStreamData if it type is globalType", () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };

      const mockDownStreamData = new Subject();
      const mockWebSocketService = {
        createWebSocketConnection: () => {},
        getDownstream: action => mockDownStreamData
      };

      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .mockWebSocketService(mockWebSocketService)
        .build();
      comp.ngOnInit();
      // Act
      mockDownStreamData.next({
        data: {
          message: {
            globalType: "Mock global type",
            type: GameActionTypes.StartGame
          }
        }
      });
      // Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.StartGame
      );
    });
  });

  describe("checkIfPlayerCanPlay", () => {
    it("should return false if game started is false and the currentUserId is different than the lastPlayingPlayerId", () => {
      // Act
      const result = component.checkIfPlayerCanPlay(false, 1, 2);
      // Assert
      expect(result).toBeFalsy();
    });

    it("should return true if game started is true and the currentUserId is different than the lastPlayingPlayerId", () => {
      // Arrange
      // Act
      const result = component.checkIfPlayerCanPlay(true, 1, 1);
      // Assert
      expect(result).toBeFalsy();
    });
  });

  describe("onNewGameClickHandler", () => {
    it("should dispatch StartNewGame and send StartNewGame", () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };
      const webSocketsActionContainers = [];
      const mockWebSocketService = {
        send: action => {
          webSocketsActionContainers.push(action);
        }
      };

      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .mockWebSocketService(mockWebSocketService)
        .build();

      // Act
      comp.onNewGameClickHandler();

      // Dispatcher Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.StartNewGame
      );
      expect(webSocketsActionContainers[0].type).toBe(
        GameActionTypes.StartNewGame
      );
    });
  });

  describe("onLeaveGameClickHandler", () => {
    it("should dispatch ResetGameStateAction and send ResetGameStateAction", () => {
      // Arrange
      const dispatcherActionContainers = [];
      const mockDispatcher = action => {
        dispatcherActionContainers.push(action);
      };
      const webSocketsActionContainers = [];
      const mockWebSocketService = {
        send: action => {
          webSocketsActionContainers.push(action);
        }
      };

      const comp = setup()
        .default()
        .mockDispatcher(mockDispatcher)
        .mockWebSocketService(mockWebSocketService)
        .build();

      // Act
      comp.onLeaveGameClickHandler();

      // Dispatcher Assert
      expect(dispatcherActionContainers[0].type).toBe(
        GameActionTypes.ResetGameState
      );
      expect(webSocketsActionContainers[0].type).toBe(
        GameActionTypes.ResetGameState
      );
    });
  });
  function setup() {
    let gameBoard;
    let currentUserId$;
    let secondUserId$;
    let gameStarted$;
    let lastPlayingPlayerId$;
    let dispatcher;
    let webSockets;
    let winnerId$;
    const builder = {
      gameBoard,
      currentUserId$,
      secondUserId$,
      winnerId$,
      build: () => {
        return new GameComponent(
          gameBoard,
          dispatcher,
          currentUserId$,
          secondUserId$,
          webSockets,
          gameStarted$,
          lastPlayingPlayerId$,
          winnerId$
        );
      },
      default: () => {
        gameBoard = of([]);
        currentUserId$ = of(1);
        secondUserId$ = of(1);
        gameStarted$ = of(false);
        lastPlayingPlayerId$ = of(0);
        dispatcher = () => {};
        webSockets = {} as any;
        winnerId$ = of(1);
        return builder;
      },
      mockDispatcher: dispatcherMock => {
        dispatcher = dispatcherMock;
        return builder;
      },
      mockWebSocketService: (mockWebSocket: any) => {
        webSockets = mockWebSocket;
        return builder;
      }
    };
    return builder;
  }
});
