import { LoadingButton } from "@mui/lab";
import { FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Category } from "../../models/Groceries";
import { ProductRequest } from "../../requests/groceries.requests";
import { groceryService } from "../../services/groceries/grocery.service";
import { categoryService } from "../../services/groceries/product.service";

const categoriesMock = [
    "Vegetable",
    "Fruit",
    "Candy"
];

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

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={1} component="form" onSubmit={handleSubmit}>
            <Grid item xs={10} sm={3}>
                <TextField fullWidth label="Name" variant="outlined" size="small"/>
            </Grid>
            <Grid item xs={10} sm={3}>
                <TextField fullWidth select label="Category" variant="outlined" size="small" >
                    {categoriesMock.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={10} sm={3}>
                <TextField fullWidth label="Quantity" type="number" variant="outlined" size="small" />
            </Grid>

            <Grid item xs={10} sm={'auto'} alignContent="center">
                <LoadingButton fullWidth type="submit" loading={loading}>
                    Add
                </LoadingButton>
            </Grid>

        </Grid>
    );
}
