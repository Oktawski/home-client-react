import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, Product } from "../../models/Groceries";
import { categoryService } from "../../services/groceries/category.service";
import { productService } from "../../services/groceries/grocery.service";
import { AddProduct } from "./AddProduct";
import { ProductList } from "./ProductList";

export function Products() {
    const [categories, setCategories] = useState(new Array<Category>());
    const [products, setProducts] = useState(new Array<Product>());

    useEffect(() => {
        fetchCategorires();
        fetchProducts();
    }, [])

    const fetchCategorires = async () => {
        const response = await categoryService.getAllAsync();
        setCategories(response);
    };

    const fetchProducts = async () => {
        const response = await productService.getAllAsync();
        setProducts(response);
    };

    const deleteByIdAsync = async (id: number) => {
        const message = await productService.removeByIdAsync(id);

        fetchProducts();

        console.log(message);
    };


    const productListProps = {
        products: products,
        fetchProducts: fetchProducts,
        deleteByIdAsync: deleteByIdAsync
    }


    return (
        <Grid container direction='column' spacing={2} display='flex' paddingX={4}>
            <Grid item marginTop={2}>
                <AddProduct categories={categories} fetchProducts={fetchProducts} />
            </Grid>
            <Grid item>
                <ProductList {...productListProps} />
            </Grid>
        </Grid>
    )
}