import { createSlice } from '@reduxjs/toolkit'


export interface ConfirmDialogState {
  isOpen: boolean, 
  title: string, 
  subTitle: string,
  onConfirm:any,
}

const initialState: ConfirmDialogState = {
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => { }
}

export const confirmDialogSlice = createSlice({
  name: 'confirmDialog',
  initialState,
  reducers: {
    setConfirmDialogState:(state, action)=>{
      state.isOpen = action.payload.isOpenConfirmDialog;
      state.title = action.payload.confirmDialogTitle;
      state.subTitle = action.payload.confirmDialogSubTitle;
      state.onConfirm = action.payload.onConfirm;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setConfirmDialogState} = confirmDialogSlice.actions;

export default confirmDialogSlice.reducer;