import { Button, Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Product } from "../../models/Groceries";
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductListProps {
    products: Array<Product>
    fetchProducts: Function,
    deleteByIdAsync: Function
}


export function ProductList(props: ProductListProps) {

    const columns: GridColDef[] = [
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
                return renderActions(params)
            }
        }
    ];

    const renderActions = (params: any) => {
        return (
            <Grid container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
            >
                <Grid item>
                    <Button fullWidth onClick={ () => props.deleteByIdAsync(params.id) }>
                        <DeleteIcon />
                    </Button>
                </Grid>

            </Grid>
        );
    };


    return (
        <div style={{ height: 400 }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <DataGrid 
                    columns={columns} 
                    rows={props.products}
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </div>
        </div>
    );
}