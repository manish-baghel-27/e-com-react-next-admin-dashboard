import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { setFormDialogOpen } from '../features/dialog/formDialogSlice';
import { setTaskLoader } from '../features/loader/loaderSlice';
import { setNotification } from '../features/notification/notificationSlice';

export const createProductAction = createAsyncThunk(
    'product/createProduct',
    async(data: FormData, thunkAPI)=>{
    const result = axios.post('api/products', data
        , {headers: {'content-type': 'multipart/form-data',}}
    );
    result.then((response)=>{
        thunkAPI.dispatch(setFormDialogOpen({isOpen: false, dialogTitle: ""}));
        thunkAPI.dispatch(setTaskLoader(false));

        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Product saved successfully.',
            getSeverity: 'success'
        }))
    },(error)=>{
        thunkAPI.dispatch(setTaskLoader(false));

        // error notification
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Product could not be saved!', 
            getSeverity: 'error'
        }))
    })
    return result;
});

export const getProductsAction = createAsyncThunk(
    "product/getProducts",
    async (_, thunkAPI) => {
        try {            
            const result = axios.get('api/products');

            result.then((res)=>{
            },(err)=>{
                thunkAPI.dispatch(setNotification({
                    isOpenSnackbar: true, 
                    messageText: err.message,
                    getSeverity: 'error'
                }))
            })

            return result;
        } catch (err) {
        }
    }
);

export const deleteProductAction = createAsyncThunk(
    "product/deleteProduct",
    async (data:any, thunkAPI) => {
        try {
            const result = axios.delete('api/products/'+ data);

            result.then((res)=>{
                thunkAPI.dispatch(setNotification({
                    isOpenSnackbar: true, 
                    messageText:'Product deleted successfully.',
                    getSeverity: 'success'
                }))
            },(err)=>{
                thunkAPI.dispatch(setNotification({
                    isOpenSnackbar: true, 
                    messageText: err.message,
                    getSeverity: 'error'
                }))
            })

            return data;
        } catch (err) {
        }
    }
);

export const updateProductAction = createAsyncThunk(
    'product/updateProduct',
    async(data:any, thunkAPI)=>{
    const id = data.get("id");

    const result = axios.patch('api/products/'+id, data);

    result.then((response)=>{
        thunkAPI.dispatch(setFormDialogOpen({isOpen: false, dialogTitle: ""}));
        thunkAPI.dispatch(setTaskLoader(false));

        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Product updated successfully.',
            getSeverity: 'success'
        }))
    },(error)=>{
        thunkAPI.dispatch(setTaskLoader(false));

        // error notification
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Product could not be updated!', 
            getSeverity: 'error'
        }))
    })
    return result;
});