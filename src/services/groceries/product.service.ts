import { Category } from "../../models/Category";
import { authenticationService } from "../authentication.service";

export const categoryService = {
    getAllAsync
};

const baseUrl = "http://127.0.0.1:8000/categories/";

async function getAllAsync(): Promise<Array<Category>> {
    const options = {
        method: "GET",
        headers: {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    const url = baseUrl 

    return await fetch(url, options)
        .then(async response => {
            if (!response.ok)
                return [];

            const body = await response.json();
            return body as Array<Category>;
        })
        .catch(error => {
            return [];
        });
}