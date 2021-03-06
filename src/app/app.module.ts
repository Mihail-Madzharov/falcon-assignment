import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { DispatcherToken } from "./app.tokens";
import { appReducers } from "./store/app.reducers";
import { SweetAlertToken } from "./store/app.token";
import { sweetAlertOptions } from "./store/app.selectors";
import { AppState } from "./store/app.state";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(AppState.stateName, appReducers),
    EffectsModule.forRoot([]),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide: DispatcherToken,
      useFactory: store => action => store.dispatch(action),
      deps: [Store]
    },
    {
      provide: SweetAlertToken,
      useFactory: store => store.select(sweetAlertOptions),
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
