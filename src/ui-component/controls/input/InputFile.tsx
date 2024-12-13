export default function InputFile(props: any) {
    const { name, type, onChange, inputImageRef, ...other } = props;
    
    return (
        <>
            <input
                onChange={onChange}
                name={name}
                type={type}
                ref={inputImageRef}
                {...other}
            />
        </>
    )
}
