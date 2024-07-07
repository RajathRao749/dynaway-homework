import { Component } from "@angular/core";
import { Asset } from "../shared/models/asset.model";
import { AssetService } from "../shared/services/asset.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  assets: Asset[] = [];
  showErrorToastMessage: boolean = false;
  skeletonLoaderCount = [1, 2, 3, 4, 5, 6];

  constructor(private assetService: AssetService) {}

  ionViewWillEnter(): void {
    this.assets = [];
    this.assetService.getAll().subscribe({
      next: (assets: Asset[]) => (this.assets = assets),
      error: () => {
        this.showErrorToastMessage = true;
      },
    });
  }

  setOpen(isOpen: boolean) {
    this.showErrorToastMessage = isOpen;
  }
}
