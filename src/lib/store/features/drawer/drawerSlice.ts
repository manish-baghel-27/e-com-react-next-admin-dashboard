import { createSlice } from '@reduxjs/toolkit'


export interface DrawerState {
    open:boolean;
}

const initialState: DrawerState = {
  open: true,
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setOpen:(state, action)=>{
      state.open = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setOpen} = drawerSlice.actions;

export default drawerSlice.reducer;