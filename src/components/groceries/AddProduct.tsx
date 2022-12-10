import { LoadingButton } from "@mui/lab";
import { useEffect, useRef, useState } from "react";
import { Category } from "../../models/Groceries";
import { ProductRequest } from "../../requests/groceries.requests";
import { groceryService } from "../../services/groceries/grocery.service";
import { categoryService } from "../../services/groceries/product.service";

interface AddProductProps {
    categories: Array<Category>
}

export function AddProduct(props: AddProductProps) {
    const [loading, setLoading] = useState(false);
    const categories: Array<Category> = props.categories ?? new Array<Category>();

    const name = useRef("");
    const category = useRef("");
    const quantity = useRef(0);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const request = new ProductRequest(
            null,
            name.current,
            category.current,
            quantity.current
        );

        const response = await groceryService.addAsync(request);

        setLoading(false);
    }

    if (loading)
        return (<div>Loading...</div>)

    return (
        <>
            Add new Product 
        </>
    );
}
