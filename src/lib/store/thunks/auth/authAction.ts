import axios from '@/lib/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUserAction = createAsyncThunk('signupUser',async(data:any)=>{
    const result = axios.post('api/auth/login', data);
    return result;
})