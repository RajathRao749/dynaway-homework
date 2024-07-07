import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { IonicModule, IonToast } from "@ionic/angular";

import { HomePage } from "./home.page";
import { AssetService } from "../shared/services/asset.service";
import { of, throwError } from "rxjs";
import { Asset } from "../shared/models/asset.model";
import { AssetCardComponent } from "./asset-card/asset-card.component";
import { By } from "@angular/platform-browser";

class MockAssetSerive {
  getAll() {
    return of([
      {
        id: "e7833d96",
        type: "Forklift",
        name: "Forklift FL-1",
        locationId: "AAL",
        locationName: "Aalborg warehouse",
        image: "",
      },
    ] as Asset[]);
  }
}

describe("HomePage", () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockAssetService: MockAssetSerive;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, AssetCardComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: AssetService, userClass: MockAssetSerive }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    mockAssetService = TestBed.inject(AssetService);
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call ionViewWillEnter", () => {
    spyOn(component, "ionViewWillEnter").and.callThrough();
    component.ionViewWillEnter();
    expect(component.ionViewWillEnter).toHaveBeenCalled();
  });

  it("should return the mock values from observable", () => {
    const mockAssets = [
      {
        id: "e7833d96",
        type: "Forklift",
        name: "Forklift FL-1",
        locationId: "AAL",
        locationName: "Aalborg warehouse",
        image: "",
      },
    ];

    spyOn(mockAssetService, "getAll").and.returnValue(of(mockAssets));
    component.ionViewWillEnter();
    fixture.detectChanges();

    expect(mockAssetService.getAll).toHaveBeenCalled();
    expect(component.assets).toEqual(mockAssets);
  });

  it("should contain child component", () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector("app-asset-card")).not.toBeNull();
  });
});
