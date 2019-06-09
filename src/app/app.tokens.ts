import { InjectionToken } from "@angular/core";
import { Dispatcher } from "./shared/types";

export const DispatcherToken = new InjectionToken<Dispatcher>(
  "This will provide the dispatcher function"
);
