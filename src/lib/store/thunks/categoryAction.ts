import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    creactPostRequest,
    updateRequest,
    getDataRequest,
    deleteRecordRequest
} from './commonAction';
import { 
    getCreateResponse, 
    getDeletedDataResponse, 
    getRecord, 
    getUpdatedRecordResponse
} from './getPromise';


export const createCategoryAction = createAsyncThunk(
    'category/createCategory',
    async(data: FormData, thunkAPI)=>{
    const result = creactPostRequest('api/create-category', data);
    
    getCreateResponse(result, thunkAPI);
    return result;
});

// categories
export const getCategoriesAction = createAsyncThunk(
    "category/getCategories",
    async (_, thunkAPI) => {
        try {
            const result = getDataRequest('api/categories');            
            getRecord(result, thunkAPI);
            return result;
        } catch (err) {
        }
    }
);

export const deleteCategoryAction = createAsyncThunk(
    "category/deleteCategory",
    async (id: string, thunkAPI) => {
        try {
            const result = deleteRecordRequest('api/delete-category/'+ id);
            getDeletedDataResponse(result, thunkAPI);
            return id;
        } catch (err) {
        }
    }
);

export const updateCategoryAction = createAsyncThunk(
    'category/updateCategory',
    async(data: FormData, thunkAPI)=>{
    const id = data.get("id");
    const result = updateRequest('api/update-category/'+id, data);
    getUpdatedRecordResponse(result, thunkAPI);
    return result;
});