import { useEffect, useRef, useState } from "react";
import { Category } from "../../models/Category";
import { ProductRequest } from "../../requests/groceries.requests";
import { groceryService } from "../../services/groceries/grocery.service";
import { categoryService } from "../../services/groceries/product.service";

export function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState(Array<Category>);

    const name = useRef("");
    const category = useRef("");
    const quantity = useRef(0);

    useEffect(() => {
        (async () => {
            const categoriesResult = await categoryService.getAllAsync();
            setCategories(categoriesResult);
        })
    }, [])
    


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

    return (
        <>
            Add new Product 
        </>
    );
}
