import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, Product } from "../../models/Groceries";
import { ProductRequest } from "../../requests/groceries.requests";
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

    

    return (
        <Grid container direction='column' spacing={2} display='flex' paddingX={4}>
            <Grid item marginTop={2}>
                <AddProduct categories={categories} fetchProducts={fetchProducts} />
            </Grid>
            <Grid item>
                <ProductList products={products} fetchProducts={fetchProducts} />
            </Grid>
        </Grid>
    )
}