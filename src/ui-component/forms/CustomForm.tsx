import styles from "./customForm.module.css";

export default function CustomForm(props:any) {
    const { children, ...other } = props;

    return (
        <form {...other} className={styles.formPosition}>
            {children}
        </form>
    )
}