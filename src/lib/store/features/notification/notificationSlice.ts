import { createSlice } from '@reduxjs/toolkit'

export interface NotificationState {
    isOpenSnackbar: boolean,
    messageText: string,
    getSeverity: any,
}

const initialState: NotificationState = {
    isOpenSnackbar: false,
    messageText: '',
    getSeverity: '',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification:(state, action)=>{
      state.isOpenSnackbar = action.payload.isOpenSnackbar;
      state.messageText = action.payload.messageText;
      state.getSeverity = action.payload.getSeverity;
    }
  },
})

export const {setNotification} = notificationSlice.actions;

export default notificationSlice.reducer;