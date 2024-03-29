import { redirect } from "react-router-dom";
import { AddProduct } from "../../components/groceries/AddProduct";
import { Product } from "../../models/Groceries";
import { ProductRequest } from "../../requests/groceries.requests";
import { AddProductResponse, DetailProductResponse, RemoveProductResponse } from "../../responses/groceries.responses";
import { authenticationService } from "../authentication.service";

export const productService = {
    addAsync,
    getByIdAsync,
    getAllAsync,
    updateAsync,
    removeByIdAsync,
};

const baseUrl = "http://127.0.0.1:8000/groceries/";


async function addAsync(request: ProductRequest): Promise<AddProductResponse | null> {
    const options = {
        method: "POST",
        headers: {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(request)
    };

    const url = baseUrl + "products/";

    return await fetch(url, options)
        .then(async response => {
            if (!response.ok)
                return null;

            const body = await response.json();
            const product = body as Product;

            return <AddProductResponse> {
                product: product,
                status: response.status
            };

        })
        .catch(error => {
            return null;
        });
}

async function getByIdAsync(id: number): Promise<DetailProductResponse | null> {
    const options = {
        method: "GET",
        headers: {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    const url = baseUrl + id;

    return await fetch(url, options)
        .then(async response => {
            if (!response.ok)
                return null;

            const body = await response.json();
            return body as DetailProductResponse;
        })
        .catch(error => {
            return null;
        });
}

async function getAllAsync(): Promise<Array<Product>> {
    const options = {
        method: "GET",
        headers:  {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    const url = baseUrl + "products/"

    return await fetch(url, options)
        .then(async response => {
            if (response.status == 401) {
                authenticationService.logout();
                redirect("/");
            }

            if (!response.ok)
                return [];

            const body = await response.json();
            return body as Array<Product>;
        })
        .catch(error => {
            return [];
        });
}

async function updateAsync(request: ProductRequest) {

}

async function removeByIdAsync(id: number): Promise<RemoveProductResponse | null>  {
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    const url = `${baseUrl}products/${id}/`;

    return await fetch(url, options)
        .then(async response => {
            if (!response.ok)
                return null;

            return <RemoveProductResponse> {
                message: "Removed " + id
            };
        })
        .catch(error => {
            return null;
        });
}
