import { Injectable } from "@angular/core";
import { createClient } from "../lib/websocketConnector";
import { Observable } from "rxjs";

export type ClientType = {
  /**
   * Send message to channel
   * @param channelName string
   * @param message any
   */
  connect: (meta: any) => Connection;
};

type Connection = {
  downstream: Observable<any>;
  join: (
    channelName: string,
    channelConfig?: {
      maxSize: number;
    }
  ) => {
    send: (message: any) => void;
    leave: () => void;
    downstream: Observable<any>;
  };
};

@Injectable({ providedIn: "root" })
export class WebSocetService {
  private client: ClientType;
  private connection: Connection;
  public createClient() {
    this.client = createClient("localhost", 4000);
  }

  public connect(userName: string) {
    this.connection = this.client.connect({ name: userName });
  }

  public joinChanel() {
    this.connection.join("ch1");
  }

  public getDownstream(): Observable<any> {
    return this.connection.downstream;
  }
}
