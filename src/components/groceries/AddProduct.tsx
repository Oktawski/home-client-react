import { LoadingButton } from "@mui/lab";
import { FormControl, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Category } from "../../models/Groceries";
import { ProductRequest } from "../../requests/groceries.requests";
import { AddProductResponse } from "../../responses/groceries.responses";
import { productService } from "../../services/groceries/grocery.service";

const categoriesMock = [
    "Vegetable",
    "Fruit",
    "Candy"
];

interface AddProductProps {
    categories: Array<Category>,
    fetchProducts: Function
}

export function AddProduct(props: AddProductProps) {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductRequest>({
        id: null,
        name: "",
        category: "",
        quantity: 0
    });

    const categories: Array<Category> = props.categories ?? new Array<Category>();

    const handleChange = (e: any) => {
        setProduct({...product, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setLoading(true);

        const response = await productService.addAsync(product);
        props.fetchProducts();

        if (response?.status == 201)
            clearForm()

        console.log(response);

        setLoading(false);
    }

    const clearForm = () => {
        setProduct(new ProductRequest(null, "", "", 0));
    }

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={1} component="form" onSubmit={handleSubmit}>

            <Grid item xs={10} sm={3}>
                <TextField 
                    required  
                    name="name"
                    fullWidth 
                    label="Name" 
                    variant="outlined" 
                    size="small"
                    value={product.name}
                    disabled={loading}
                    onChange={handleChange} />
            </Grid>

            <Grid item xs={10} sm={3}>
                <TextField 
                    required 
                    name="category"
                    select 
                    fullWidth 
                    label="Category" 
                    variant="outlined" 
                    size="small" 
                    value={product.category}
                    disabled={loading}
                    onChange={handleChange}
                >
                    {categoriesMock.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={10} sm={3}>
                <TextField 
                    required 
                    name="quantity"
                    fullWidth 
                    label="Quantity" 
                    type="number" 
                    variant="outlined" 
                    size="small"
                    value={product.quantity}
                    disabled={loading}
                    onChange={handleChange} 
                    InputProps={{ inputProps: { min: 0 }}}
                    />
            </Grid>

            <Grid item xs={10} sm={'auto'} alignContent="center">
                <LoadingButton fullWidth type="submit" loading={loading}>
                    Add
                </LoadingButton>
            </Grid>

        </Grid>
    );
}
