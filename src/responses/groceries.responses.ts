import { Product } from "../models/Product";

export interface AddProductResponse {
    product: Product;
    status: number;
}

export interface DetailProductResponse {
    product: Product;
}

export interface RemoveProductResponse {

}