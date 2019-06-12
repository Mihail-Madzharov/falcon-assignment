import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Output,
  EventEmitter
} from "@angular/core";
import { Subject } from "rxjs";

import { AppComponent } from "./app.component";
import { SweetAlertToken } from "./store/app.token";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "swal",
  template: ""
})
export class SweetAlertMockComponent {
  @Output()
  confirm = new EventEmitter();
  @Output()
  cancel = new EventEmitter();
}

describe("AppComponent", () => {
  let fixture;
  let app: AppComponent;
  let sweetAlert: Subject<any>;
  beforeEach(async(() => {
    sweetAlert = new Subject();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, SweetAlertMockComponent],
      providers: [{ provide: SweetAlertToken, useValue: sweetAlert }]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  it("should call show", () => {
    // Arrange
    app.ngOnInit();
    const showSpy = jest.fn();
    app.sweetAlert = { show: showSpy } as any;
    // Act
    sweetAlert.next({});

    // Assert
    expect(showSpy).toHaveBeenCalled();
  });

  it("should call the sweetAlertConfirm callBack on onSweetAlertConfirm", () => {
    // Arrange
    app.ngOnInit();
    const confirmCallbackSpy = jest.fn();
    app.sweetAlert = {
      show: () => {}
    } as any;
    // Act
    sweetAlert.next({ confirmCallback: confirmCallbackSpy });
    app.onSweetAlertConfirm();
    // Assert
    expect(confirmCallbackSpy).toHaveBeenCalled();
  });

  it("should call the sweetAlertCancelCallback on onSweetAlertCancel", () => {
    // Arrange
    app.ngOnInit();
    const cancelCallBack = jest.fn();
    app.sweetAlert = {
      show: () => {}
    } as any;
    // Act
    sweetAlert.next({ cancelCallback: cancelCallBack });
    app.onSweetAlertCancel();
    // Assert
    expect(cancelCallBack).toHaveBeenCalled();
  });
});
