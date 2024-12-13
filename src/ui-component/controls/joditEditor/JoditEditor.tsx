import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export const CustomJoditEditor = (props: any) =>{
    const {innerRef, value, values, setValues} = props;

    const config = useMemo(() => {
		return {
            "spellcheck": true,
			readonly: false,
            tabIndex: -1,
			placeholder: 'Start typing...'
		}},
		[]
	);

    return(
        <>
            <JoditEditor
            // ref={innerRef}
            value={value}
            config={config}
            onBlur={newContent => setValues({...values, 'description':newContent})}/>
        </>
    )
}