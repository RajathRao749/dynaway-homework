import { Asset } from "../models/asset.model"

export interface AssetApiResponse {
    ok: boolean;
    data: Asset[];
}