import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Category } from "../../models/Groceries";
import { categoryService } from "../../services/groceries/category.service";
import { AddProduct } from "./AddProduct";
import { ProductList } from "./ProductList";

export function Products() {
    const [categories, setCategories] = useState(new Array<Category>());

    useEffect(() => {
        (async () => {
            const categoriesResponse = await categoryService.getAllAsync();
            setCategories(categoriesResponse);
        })();
    }, [])

    return (
        <Grid container direction='column' spacing={2} display='flex' paddingX={4}>
            <Grid item marginTop={2}>
                <AddProduct categories={ categories } />
            </Grid>
            <Grid item>
                <ProductList />
            </Grid>
        </Grid>
    )
}