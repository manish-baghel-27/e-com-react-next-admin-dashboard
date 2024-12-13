import DialogActions from '@mui/material/DialogActions';
import { CustomComponents } from '@/ui-component';
import styles from "./formDialog.module.css";

export default function DialogActionButton(props:any) {
  const CustomButton = CustomComponents.CustomButton;
  const { buttonText } = props;
  return (
    <>
      <DialogActions
        className={styles.fixedAtBottom}
        // sx={{ backgroundColor: (theme:any) => theme.palette.grey[500]}}
      >
        {props.children}
        <CustomButton
            text={buttonText}
            variant="contained"
            color="primary"
            type="submit"
        />
      </DialogActions>
    </>
  )
}
