"use client"

import { useEffect, useMemo, useState } from 'react';
import { CustomComponents } from '@/ui-component';
import { Box, Button, IconButton, Tooltip, Grid, Container } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { AddCircleRounded } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setFormDialogOpen } from '@/lib/store/features/dialog/formDialogSlice';
import AddProduct from './add/addProduct';
import { deleteProductAction, getProductsAction } from '@/lib/store/thunks/productAction';


export default function Products() {
    const dispatch = useAppDispatch();
    const productsDataLoading = useAppSelector((state)=>state.product.productsDataLoading);
    const getallProducts = useAppSelector((state)=> state.product.products);

    const CustomFormDialog = CustomComponents.CustomFormDialog;
    const Breadcrumb = CustomComponents.Breadcrumb;
    const ListPageCard = CustomComponents.ListPageCard;
    const CustomLinearLoader = CustomComponents.CustomLinearLoader;
    const DataGridActions = CustomComponents.DataGridActions;

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [allProducts, setProducts] = useState(Array<any>);

    // products
    useEffect(() => {
        if (getallProducts.length > 0){
            return;
        }
        dispatch(getProductsAction());
    }, []);    

    useEffect(() => {
        if (Array.isArray(getallProducts)) {
            setProducts(getallProducts); 
        }else{
            setProducts([]);
        }
    }, [getallProducts])

    // delete
    const deleteRecord = (id: any) => {
        dispatch(deleteProductAction(id));
    }

    const columns: any = useMemo(
        () => [
            {
                field: 'product_name',
                headerName: 'Product Name',
                sortable: true,
                width: 400,
            },
            {
                field: 'price',
                headerName: 'Price',
                sortable: true,
                width: 200
            },
            {
                field: 'related_categories',
                headerName: 'Categories',
                sortable: false,
                width: 400,
                valueGetter: (related_categories: Array<{category_name: string}>) => {
                    let result :Array<string> = [];
                    if (related_categories) {
                        related_categories.map((category: {category_name: string})=>{
                            result.push(category.category_name)
                        })
                    }
                    else {
                        result = ["Unknown"];
                    }
                    return (result.join(", "));
                }
            },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                sortable: false,
                // flex: 1,
                width:150,
                renderCell: (params:any) => {                    
                    return (
                        <>
                            <DataGridActions
                                params={params}
                                setRecordForEdit={setRecordForEdit}
                                deleteFunction={deleteRecord}
                                dialogTitle= "Update Product"
                            />
                        </>
                    )
                }
            },
        ],
        []
    );

    return (
        <>
            {
                productsDataLoading ? 
                <>
                    <CustomLinearLoader />
                </>
                :
                <>
                    <Breadcrumb pageName="Products"/>
                    <ListPageCard>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                variant="contained"
                                endIcon={< AddCircleRounded/>}
                                onClick={() => {
                                    dispatch(setFormDialogOpen({ isOpen: true, dialogTitle: "Add Product"}));
                                    setRecordForEdit(null);
                                }}
                                sx={{ borderRadius: '10px' }}>
                                Add
                            </Button>
                        </Box>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Box sx={{ height: 400, width: '100%' }}
                                // maxWidth={{xs:280, sm:400, md:800, lg:1200}}
                            >
                                {
                                    allProducts.length > 0 &&
                                    <DataGrid
                                        columns={columns}
                                        rows={allProducts}
                                        // sx={{ borderColor: 'transparent' }}
                                        slots={{ toolbar: GridToolbar }}
                                        getRowId={(row) => row._id} 
                                        slotProps={{
                                            toolbar: {
                                                showQuickFilter: true,
                                                quickFilterProps: { debounceMs: 500 },
                                            },
                                        }}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 5,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 20]}
                                        disableRowSelectionOnClick />
                                }
                            </Box>
                        </Grid>
                    </ListPageCard>

                    <CustomFormDialog
                        size='md'
                        isFullWidth={true}>
                        <AddProduct
                        recordForEdit={recordForEdit}/>
                    </CustomFormDialog>
                </>
            }  
        </>
    )
}