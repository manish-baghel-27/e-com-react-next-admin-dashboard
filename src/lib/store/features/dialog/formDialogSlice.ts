import { createSlice } from '@reduxjs/toolkit'


export interface FormDialogState {
  isOpen: boolean;
  dialogTitle: string;
}

const initialState: FormDialogState = {
  isOpen: false,
  dialogTitle:''
}

export const formDialogSlice = createSlice({
  name: 'formDialog',
  initialState,
  reducers: {
    setFormDialogOpen:(state, action)=>{
      state.isOpen = action.payload.isOpen;
      state.dialogTitle = action.payload.dialogTitle;
    }
  },
})

// Action creators are generated for each case reducer function
export const {setFormDialogOpen} = formDialogSlice.actions;

export default formDialogSlice.reducer;