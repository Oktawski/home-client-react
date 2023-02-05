import { Category } from "../../models/Groceries";
import { authenticationService } from "../authentication.service";

export const categoryService = {
    getAllAsync
};

const baseUrl = "http://127.0.0.1:8000/groceries/categories/";

async function getAllAsync(): Promise<Array<Category>> {
    const options = {
        method: "GET",
        headers: {
            "Authorization": authenticationService.getAuthHeader(),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    return await fetch(baseUrl, options)
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