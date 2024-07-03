import { Component } from '@angular/core'
import { Asset } from '../shared/models/asset.model'
import { AssetService } from '../shared/services/asset.service'
import { AssetApiResponse } from '../shared/models/http-response.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  assets: Asset[] = []

  constructor(private assetService: AssetService) {}

  ionViewWillEnter(): void {
    this.assets = [];
    this.assetService.getAll().subscribe((assets:AssetApiResponse) => this.assets = assets.data);
  }
}
