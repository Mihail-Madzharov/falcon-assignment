import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createClient } from "../lib/websocketConnector";

interface Chanel {
  send: (message: any) => void;
  leave: () => void;
  downstream: Observable<any>;
}

@Injectable({ providedIn: "root" })
export class WebSocketService {
  private chanel: Chanel;

  public createWebSocketConnection(metaData?: any) {
    const client = createClient("localhost", 4000);
    const connection = client.connect(metaData);
    this.chanel = connection.join("ch1");
  }

  public getDownstream(): Observable<any> {
    return this.chanel.downstream;
  }

  public send(message: any) {
    this.chanel.send(message);
  }
}
