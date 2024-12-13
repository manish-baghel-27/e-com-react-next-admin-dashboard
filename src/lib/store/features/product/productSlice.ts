import { createSlice } from '@reduxjs/toolkit'
import { 
  createProductAction, 
  deleteProductAction, 
  getProductsAction, 
  updateProductAction 
} from '../../thunks/productAction';

export interface ProductState {
  products: any;
  productsDataLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  productsDataLoading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(createProductAction.pending, (state, action)=>{})
    .addCase(createProductAction.fulfilled,(state, {payload})=>{
      let getInsertedProduct = (payload.data.data.product[0]);
      state.products.push(getInsertedProduct);
    })
    .addCase(createProductAction.rejected,(state)=>{})
    // ---------- get products
    .addCase(getProductsAction.pending, (state, action)=>{
      state.productsDataLoading = true;
    })
    .addCase(getProductsAction.fulfilled, (state, {payload})=>{
      state.productsDataLoading = false;
      const productsData = payload?.data.data.products;
      state.products = productsData;
    })
    .addCase(getProductsAction.rejected, (state, action)=>{
      state.productsDataLoading = false;
    })
    // --------- delete
    .addCase(deleteProductAction.pending, (state, action)=>{
    })
    .addCase(deleteProductAction.fulfilled, (state, {payload})=>{
      state.products = state.products.filter((product:any) => product._id !== payload);
    })
    .addCase(deleteProductAction.rejected, (state, action)=>{
    })
    // ---------- update
    .addCase(updateProductAction.pending, (state, action)=>{})
    .addCase(updateProductAction.fulfilled,(state, {payload})=>{
      let getUpdatedProduct = (payload.data.data.product[0]);
      const products = state.products;
      const getIndex = products.findIndex((product:any) => product._id === getUpdatedProduct._id);
      products[getIndex] = getUpdatedProduct;
    })
    .addCase(updateProductAction.rejected,(state)=>{})
  }
})

export default productSlice.reducer;