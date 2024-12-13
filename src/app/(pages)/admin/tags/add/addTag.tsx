import React, { useEffect, useState } from 'react'
import { CustomComponents } from '@/ui-component';
import { Grid } from '@mui/material';
import { useAppDispatch } from '@/lib/store/hooks';
import { setTaskLoader } from '@/lib/store/features/loader/loaderSlice';
import { createTagAction, updateTagAction } from '@/lib/store/thunks/tagAction';

const initialFormValues = {
    id: '',
    name: '',
    is_active: true,
};

export default function AddTag(props:any) {
    const dispatch = useAppDispatch();

    const CustomInput = CustomComponents.CustomInput;
    const CustomForm = CustomComponents.CustomForm;
    const UseForm = CustomComponents.UseForm;
    const DialogActionButton = CustomComponents.DialogActionButton;
    const FormDialogContent = CustomComponents.FormDialogContent;

    // validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('name' in fieldValues) {
            temp.name = fieldValues.name ? "" : "Tag Name is required!"
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values) {
            return Object.values(temp).every(x => x == "")
        }
    }

    const { values, setValues, errors, setErrors, handleInput, resetForm } = UseForm(initialFormValues, true, validate);
    const [buttonText, setButtonText] = useState('Submit');

    // insert
    const saveRecord = (e:any) => {
        e.preventDefault();

        let _id = values.id;

        if (validate()) {
            const formData = new FormData();
            formData.append('id', _id);
            formData.append('name', values.name);
            formData.append('is_active', values.is_active);

            dispatch(setTaskLoader(true));
            if (_id) {
                dispatch(updateTagAction(formData));
            }else{
                dispatch(createTagAction(formData));
            }
        }
    }

    useEffect(() => {
        if (props.recordForEdit) {
            setValues({
                id: props.recordForEdit._id,
                name: props.recordForEdit.name,
                is_active: props.recordForEdit.is_active,
            })
            setButtonText('Update');
        }else{
            setButtonText('Submit');
        }
    }, [props.recordForEdit]);

    return (
        <>
            <CustomForm onSubmit={saveRecord} id="TAG_FORM">
                <FormDialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomInput
                                autoFocus
                                name="name"
                                label="Tag Name"
                                value={values.name}
                                onChange={handleInput}
                                error={errors.name}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </FormDialogContent>
                <DialogActionButton
                    buttonText={buttonText}
                />
            </CustomForm>
        </>
    )
}
