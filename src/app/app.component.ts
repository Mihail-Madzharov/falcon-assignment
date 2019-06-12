import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { SweetAlertToken } from "./store/app.token";
import { Observable } from "rxjs";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { tap } from "rxjs/operators";

import { SweetAlertModel } from "./shared/sweet-allert.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private sweetAlertConfirmCallback: () => void;
  private cancelCallback: () => void;

  @ViewChild("sweetAlert", { static: true })
  sweetAlert: SwalComponent;

  constructor(
    @Inject(SweetAlertToken)
    public sweetAlert$: Observable<SweetAlertModel>
  ) {}

  ngOnInit(): void {
    this.sweetAlert$
      .pipe(
        tap(value => {
          if (value) {
            this.sweetAlert.options = value.options;
            this.sweetAlertConfirmCallback = value.confirmCallback;
            this.cancelCallback = value.cancelCallback;
            this.sweetAlert.show();
          }
        })
      )
      .subscribe();
  }

  onSweetAlertConfirm() {
    this.sweetAlertConfirmCallback();
  }

  onSweetAlertCancel() {
    this.cancelCallback();
  }
}
