import React, { useEffect, useRef, useState } from 'react'
import { CustomComponents } from '@/ui-component';
import { Grid } from '@mui/material';
import { useAppDispatch } from '@/lib/store/hooks';
import { setTaskLoader } from '@/lib/store/features/loader/loaderSlice';
import { createCategoryAction, updateCategoryAction } from '@/lib/store/thunks/categoryAction';

const initialFormValues = {
    id: '',
    category_name: '',
    description: '',
    is_active: true,
};

export default function AddCategory(props:any) {
    const dispatch = useAppDispatch();

    const CustomInput = CustomComponents.CustomInput;
    const CustomForm = CustomComponents.CustomForm;
    const UseForm = CustomComponents.UseForm;
    const DialogActionButton = CustomComponents.DialogActionButton;
    const FormDialogContent = CustomComponents.FormDialogContent;
    // const InputFile = CustomComponents.InputFile;

    // validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('category_name' in fieldValues) {
            temp.category_name = fieldValues.category_name ? "" : "Category Name is required!"
        }

        setErrors({
            ...temp
        })

        if (fieldValues == values) {
            return Object.values(temp).every(x => x == "")
        }
    }

    // const inputImageRef = useRef(null);
    // const [picture, setPicture] = useState({logo:''});
    const { values, setValues, errors, setErrors, handleInput, resetForm } = UseForm(initialFormValues, true, validate);
    const [buttonText, setButtonText] = useState('Submit');

    // image change event
    // const handleImageChange = (e: any) => {
    //     e.persist();

    //     setErrors({
    //         ...errors,
    //         [e.target.name]: ""
    //     })
    //     setPicture({
    //         ...picture,
    //         [e.target.name]: e.target.files[0]
    //     });
    // }

    // insert
    const saveRecord = (e:any) => {
        e.preventDefault();        

        let categoryId = values.id;

        if (validate()) {
            const formData = new FormData();
            formData.append('id', categoryId);
            formData.append('category', values.category_name);
            formData.append('description', values.description);
            formData.append('is_active', values.is_active);
            // formData.append('image_data', picture.logo);
            
            dispatch(setTaskLoader(true));
            if (categoryId) {
                dispatch(updateCategoryAction(formData));
            }else{
                dispatch(createCategoryAction(formData));
            }
        }
    }

    useEffect(() => {
        if (props.recordForEdit) {
            setValues({
                id: props.recordForEdit.id,
                category_name: props.recordForEdit.category,
                description: props.recordForEdit.description? props.recordForEdit.description:'',
                is_active: props.recordForEdit.is_active,
            })
            
            setButtonText('Update');
        }else{
            setButtonText('Submit');
        }
    }, [props.recordForEdit]);

    return (
        <>
            <CustomForm onSubmit={saveRecord} id="CATEGORY_FORM">
                <FormDialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomInput
                                autoFocus
                                name="category_name"
                                label="Category Name"
                                value={values.category_name}
                                onChange={handleInput}
                                error={errors.category_name}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInput
                                name="description"
                                label="Description"
                                value={values.description}
                                onChange={handleInput}
                                error={errors.description}
                                multiline
                                rows={2}
                                fullWidth
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <InputFile
                                type="file"
                                name="logo"
                                onChange={handleImageChange}
                                inputImageRef={inputImageRef}
                            />
                        </Grid> */}
                    </Grid>
                </FormDialogContent>
                <DialogActionButton
                    buttonText={buttonText}
                />
            </CustomForm>
        </>
    )
}
