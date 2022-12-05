import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { Product } from "../../models/Product"
import { DetailProductResponse } from "../../responses/groceries.responses"
import { groceryService } from "../../services/groceries/grocery.service"

export function Products() {
    const [products, setProducts] = useState(Array<Product>)

    useEffect(() => {
        (async () => {
            const response = await groceryService.getAllAsync();
            setProducts(response);
        })();
    }, []);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, flex: 1 },
        { field: 'name', headerName: 'Name', width: 130, flex: 1 },
        { field: 'category', headerName: 'Category', width: 130, flex: 1 },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 90,
        }
    ];

    return (
        <div style={{ height: 700, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <DataGrid 
                    columns={columns} 
                    rows={products}
                />
            </div>
        </div>
    );
}