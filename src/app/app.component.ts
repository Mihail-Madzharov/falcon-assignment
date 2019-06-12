import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { SweetAlertToken } from "./store/app.token";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { SweetAlertOptions } from "sweetalert2";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { tap } from "rxjs/operators";

import { DispatcherToken } from "./app.tokens";
import { Dispatcher } from "./shared/types";
import { UpdateSweetAlertOptions } from "./store/app.actions";
import { ResetGameStateAction } from "./home/game/store/game.actions";
import { SweetAlertModel } from "./shared/sweet-allert.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private sweetAlertConfirmAction: Action;
  private sweetAlertCancelAction: Action;

  @ViewChild("sweetAlert", { static: true })
  sweetAlert: SwalComponent;

  constructor(
    @Inject(SweetAlertToken)
    public sweetAlert$: Observable<SweetAlertModel>,
    @Inject(DispatcherToken) private dispatcher: Dispatcher
  ) {}

  ngOnInit(): void {
    this.sweetAlert$
      .pipe(
        tap(value => {
          if (value) {
            this.sweetAlert.options = value.options;
            this.sweetAlertConfirmAction = value.confirmAction;
            this.sweetAlertCancelAction = value.cancelAction;
            this.sweetAlert.show();
          }
        })
      )
      .subscribe();
  }

  onSweetAlertConfirm() {
    this.dispatcher(this.sweetAlertConfirmAction);
  }

  onSweetAlertCancel() {
    this.dispatcher(this.sweetAlertCancelAction);
  }
}
