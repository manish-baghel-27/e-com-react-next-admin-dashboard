import { setFormDialogOpen } from "../features/dialog/formDialogSlice";
import { setTaskLoader } from "../features/loader/loaderSlice";
import { setNotification } from "../features/notification/notificationSlice";

export function getCreateResponse(result: any, thunkAPI: any) {
    result.then((response: any)=>{        
        thunkAPI.dispatch(setFormDialogOpen({isOpen: false, dialogTitle: ""}));
        thunkAPI.dispatch(setTaskLoader(false));

        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Record saved successfully.',
            getSeverity: 'success'
        }))
    },(err: any)=>{
        thunkAPI.dispatch(setTaskLoader(false));

        // error notification
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText: err.message, 
            getSeverity: 'error'
        }))
    })
}

export function getRecord(result: any, thunkAPI: any) {
    result.then((res:any)=>{
    },(err: any)=>{
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText: err.message,
            getSeverity: 'error'
        }))
    })
}

// delete
export function getDeletedDataResponse(result: any, thunkAPI: any) {
    result.then((res: any)=>{
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Record deleted successfully.',
            getSeverity: 'success'
        }))
    },(err: any)=>{
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText: err.message,
            getSeverity: 'error'
        }))
    })
}

export function getUpdatedRecordResponse(result: any, thunkAPI: any) {
    result.then((response: any)=>{
        thunkAPI.dispatch(setFormDialogOpen({isOpen: false, dialogTitle: ""}));
        thunkAPI.dispatch(setTaskLoader(false));
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText:'Record updated successfully.',
            getSeverity: 'success'
        }))
    },(err: any)=>{
        thunkAPI.dispatch(setTaskLoader(false));
        // error notification
        thunkAPI.dispatch(setNotification({
            isOpenSnackbar: true, 
            messageText: err.message, 
            getSeverity: 'error'
        }))
    })
}