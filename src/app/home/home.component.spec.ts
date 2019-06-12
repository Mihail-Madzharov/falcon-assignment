import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });
});
