import DialogContent from '@mui/material/DialogContent';
import styles from "./formDialog.module.css";

export default function FormDialogContent(props:any) {
  return (
    <>
      <DialogContent dividers className={styles.dialogContentBorderBottomNone}>
        {props.children}
      </DialogContent>
    </>
  )
}
