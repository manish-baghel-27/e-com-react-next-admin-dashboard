import { createSlice } from '@reduxjs/toolkit'
import { 
    createTagAction,
    deleteTagAction,
    getTagsAction,
    updateTagAction,
} from '../thunks/tagAction';

export interface TagState {
  tags: Array<any>;
}

const initialState: TagState = {
  tags: [],
}

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(createTagAction.fulfilled,(state, {payload})=>{
      // const tag = (payload.data.data.tag);
      // state.tags.push(tag);
    })
    // ---------- get
    .addCase(getTagsAction.fulfilled, (state, {payload})=>{
      // const tags = payload?.data.data.tags;
      // state.tags = tags;
    })
    // --------- delete
    .addCase(deleteTagAction.fulfilled, (state, {payload})=>{
      // state.tags = state.tags.filter((tag: any) => tag._id !== payload);
    })
    // ---------- update
    .addCase(updateTagAction.fulfilled,(state, {payload})=>{
      // const updatedtag = (payload.data.data.tag);
      // const stateTags = state.tags;
      // const getIndex = stateTags.findIndex((tag: any) => tag._id === updatedtag._id);
      // stateTags[getIndex] = updatedtag;
    })
  }
})

export default tagSlice.reducer;