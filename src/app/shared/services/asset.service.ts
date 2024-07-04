import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { mockAssetHttpResponse } from './asset.test'
import { delay, tap } from 'rxjs/operators'
import { getRandomInt } from '../functions'
import { AssetApiResponse } from '../models/http-response.model'

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  constructor() {
  }

  getAll(): Observable<AssetApiResponse> {
    return of(mockAssetHttpResponse).pipe(
      delay(getRandomInt(1000) + 500), // fake random http delay,
      tap(() => { // a small chance for the data fetch to error
        if (getRandomInt(10) % 10 === 0) throw Error('Http error')
      }),
    )
  }
}
