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

// create
export const createBlogPostAction = createAsyncThunk(
    'blogPost/createBlogPost',
    async(data: FormData, thunkAPI)=>{
    const result = creactPostRequest('api/blog-posts', data);
    
    getCreateResponse(result, thunkAPI);
    return result;
});

// get blog posts
export const getBlogPostsAction = createAsyncThunk(
    "blogPost/getBlogPosts",
    async (_, thunkAPI) => {
        try {
            const result = getDataRequest('api/blog-posts');
            getRecord(result, thunkAPI);
            return result;
        } catch (err) {
        }
    }
);

// delete
export const deleteBlogPostAction = createAsyncThunk(
    "blogPost/deleteBlogPost",
    async (id: string, thunkAPI) => {
        try {
            const result = deleteRecordRequest('api/blog-posts/'+ id);
            getDeletedDataResponse(result, thunkAPI);
            return id;
        } catch (err) {
        }
    }
);

// update
export const updateBlogPostAction = createAsyncThunk(
    'blogPost/updateBlogPost',
    async(data: FormData, thunkAPI)=>{
    const id = data.get("id");
    const result = updateRequest('api/blog-posts/' + id, data);
    getUpdatedRecordResponse(result, thunkAPI);
    return result;
});