import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { Product } from "../../models/Groceries";
import { groceryService } from "../../services/groceries/grocery.service"

export function ProductList() {
    const [products, setProducts] = useState(Array<Product>)

    useEffect(() => {
        (async () => {
            const response = await groceryService.getAllAsync();
            setProducts(response);
        })();
    }, []);


    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
            field: 'quantity',
            headerName: 'Quantity',
            flex: 1,
            align: 'center'
        }
    ];

    return (
        <div style={{ height: 400 }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <DataGrid 
                    columns={columns} 
                    rows={products}
                />
            </div>
        </div>
    );
}