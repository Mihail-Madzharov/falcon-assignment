import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PlayersComponent } from "./players.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler/src/core";

describe("PlayersComponent", () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayersComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
