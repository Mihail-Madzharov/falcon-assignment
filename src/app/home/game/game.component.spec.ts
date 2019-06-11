import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from "@angular/core";
import { of, Subject } from "rxjs";

import { GameComponent } from "./game.component";
import {
  GameBoardToken,
  CurrentUserIdToken,
  SecondUserIdToken,
  GameStartedToken
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
    expect(webSocketsActionContainers[0].type).toBe(GameActionTypes.StartGame);
    expect(webSocketsActionContainers[0].payload).toBeTruthy();
    expect(webSocketsActionContainers[1].type).toBe(
      GameActionTypes.UpdateSecondUserId
    );
    expect(webSocketsActionContainers[1].payload).toBe(PlayersEnum.PlayerOne);

    // Dispatcher Assert
    expect(dispatcherActionContainers[0].type).toBe(GameActionTypes.StartGame);
    expect(dispatcherActionContainers[0].payload).toBeTruthy();
    expect(dispatcherActionContainers[1].type).toBe(
      GameActionTypes.UpdateCurrentUserId
    );
    expect(dispatcherActionContainers[1].payload).toBe(PlayersEnum.PlayerOne);
  });

  it(`should dispatch action for selecting a cell and call send function of the webSocketService to update the selected cell`, () => {
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
    comp.onCellSelect({ col: 1, row: 1 });

    // webSocket Assert
    expect(webSocketsActionContainers[0].type).toBe(GameActionTypes.SelectCell);
    expect(webSocketsActionContainers[0].payload).toEqual({ col: 1, row: 1 });

    // Dispatcher Assert
    expect(dispatcherActionContainers[0].type).toBe(GameActionTypes.SelectCell);
    expect(dispatcherActionContainers[0].payload).toEqual({ col: 1, row: 1 });
  });

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
      GameActionTypes.UpdateSecondUserId
    );
    expect(webSocketsActionContainers[0].payload).toEqual(
      PlayersEnum.PlayerOne
    );

    // Dispatcher Assert
    expect(dispatcherActionContainers[0].type).toBe(
      GameActionTypes.UpdateCurrentUserId
    );
    expect(dispatcherActionContainers[0].payload).toEqual(
      PlayersEnum.PlayerTwo
    );
  });

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
    expect(dispatcherActionContainers[0].type).toBe(GameActionTypes.StartGame);
  });

  function setup() {
    let gameBoard;
    let currentUserId$;
    let secondUserId$;
    let gameStarted$;
    let dispatcher;
    let webSockets;
    const builder = {
      gameBoard,
      currentUserId$,
      secondUserId$,
      build: () => {
        return new GameComponent(
          gameBoard,
          dispatcher,
          currentUserId$,
          secondUserId$,
          webSockets,
          gameStarted$
        );
      },

      default: () => {
        gameBoard = of([]);
        currentUserId$ = of(1);
        secondUserId$ = of(1);
        gameStarted$ = of(false);
        dispatcher = () => {};
        webSockets = {} as any;
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
