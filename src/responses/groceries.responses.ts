import { Product } from "../models/Groceries";

export interface AddProductResponse {
    product: Product;
    status: number;
}

export interface DetailProductResponse {
    product: Product;
}

export interface RemoveProductResponse {

}