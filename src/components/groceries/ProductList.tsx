import { Button, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import React, { useEffect, useState } from "react"
import { Product } from "../../models/Groceries";
import { productService } from "../../services/groceries/grocery.service"
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductListProps {
    products: Array<Product>
    fetchProducts: Function
}

interface ProductActions {
    deleteByIdAsync: Function
}

export function ProductList(props: ProductListProps) {

    const columns = (productActions: ProductActions): GridColDef[] => {
        return [
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'name', headerName: 'Name', flex: 2 },
            { field: 'category', headerName: 'Category', flex: 1 },
            {
                field: 'quantity',
                headerName: 'Quantity',
                flex: 1,
                align: 'center'
            },
            {
                field: 'actions',
                headerName: '',
                sortable: false,
                flex: 1,
                renderCell: (params) => {
                    return actionsRow(params,
                        () => productActions.deleteByIdAsync(params.id));
                }
            }
        ];
    }

    const removeById = async (id: number) => {
        const message = await productService.removeByIdAsync(id);

        props.fetchProducts(); 

        console.log(message);
    }

    const actionsRow = (params: any, deleteByIdAsync: React.MouseEventHandler) => {
        return (
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item>
                    <Button fullWidth onClick={deleteByIdAsync}>
                        <DeleteIcon />
                    </Button>
                </Grid>

            </Grid>
        )
    }

    return (
        <div style={{ height: 400 }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <DataGrid 
                    columns={columns({deleteByIdAsync: removeById})} 
                    rows={props.products}
                />
            </div>
        </div>
    );
}