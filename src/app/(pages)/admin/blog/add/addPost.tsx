import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { CustomComponents } from '@/ui-component';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setTaskLoader } from '@/lib/store/features/loader/loaderSlice';
import { createBlogPostAction, updateBlogPostAction } from '@/lib/store/thunks/blogPostAction';
import { getCategoriesAction } from '@/lib/store/thunks/categoryAction';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

const initialFormValues = {
    id: '',
    title: '',
    sub_title:'',
    description: '',
    priority:'',
    is_active: true,
    categories:[],
};

export default function AddPost(props:any) {
    const dispatch = useAppDispatch();

    const CustomInput = CustomComponents.CustomInput;
    const CustomForm = CustomComponents.CustomForm;
    const UseForm = CustomComponents.UseForm;
    const DialogActionButton = CustomComponents.DialogActionButton;
    const FormDialogContent = CustomComponents.FormDialogContent;
    const CustomJoditEditor = CustomComponents.CustomJoditEditor;
    const MultiSelect = CustomComponents.MultiSelect;
    // const InputFile = CustomComponents.InputFile;

    // validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('categories' in fieldValues) {
            temp.categories = fieldValues.categories.length ? "" : "Category is required!"
        }

        if ('title' in fieldValues) {
            temp.title = fieldValues.title ? "" : "Title Name is required!"
        }

        if ('description' in fieldValues) {
            temp.description = fieldValues.description ? "" : "Description is required!"
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
    const stateCategories = useAppSelector((state)=> state.categoryReducer.categories);
    const [buttonText, setButtonText] = useState('Submit');

    // jodit
    const editor = useRef();

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

        let postId = values.id;

        if (validate()) {
            const formData = new FormData();
            formData.append('id', postId);
            formData.append('categories', JSON.stringify(values.categories));
            formData.append('title', values.title);
            formData.append('sub_title', values.sub_title);
            formData.append('body', values.description);
            // formData.append('priority', values.description);
            formData.append('is_active', values.is_active);
            // formData.append('image_data', picture.logo);
            
            dispatch(setTaskLoader(true));
            if (postId) {                
                dispatch(updateBlogPostAction(formData));
            }else{
                dispatch(createBlogPostAction(formData));
            }
        }
    }

    useEffect(() => {
        if (stateCategories.length < 1) {
            dispatch(getCategoriesAction());
        }
    });
    
    useEffect(() => {
        if (props.recordForEdit) {
            let category_ids:Array<number>=[];

            const getCategoryIds = new Promise((resolve, reject)=>{
                props.recordForEdit.categories.forEach((category: { id: number; }) => {
                    category_ids.push(category['id']);
                });
                resolve(category_ids);
            })

            getCategoryIds.then((categories)=>{
                setValues({
                    id: props.recordForEdit.id,
                    categories: categories,
                    title: props.recordForEdit.title,
                    sub_title: props.recordForEdit.sub_title,
                    description: props.recordForEdit.body,
                    is_active: props.recordForEdit.is_active,
                })  
            })
            setButtonText('Update');
        }else{
            setButtonText('Submit');
        }
    }, [props.recordForEdit]);



    return (
        <>
            <CustomForm onSubmit={saveRecord} id="BLOG_POST_FORM">
                <FormDialogContent>
                    <Grid container spacing={2}>
                        {/* categories */}
                        {stateCategories.length > 0 &&
                            <Grid item xs={12}>
                                <MultiSelect
                                    id="categories_id"
                                    name="categories"
                                    label="Select Categories"
                                    label_id="categories_id"
                                    value={values.categories}
                                    error={errors.categories}
                                    onChange={handleInput}
                                    variant="outlined"
                                >
                                    {stateCategories.map((category: {id:number, category:string}) => (
                                        <MenuItem
                                        key={category.id}
                                        value={category.id}
                                        >
                                            {category.category}
                                        </MenuItem>
                                    ))}
                                </MultiSelect>
                            </Grid>
                        }

                        {/* title */}
                        <Grid item xs={12}>
                            <CustomInput
                                autoFocus
                                name="title"
                                label="Post Title"
                                value={values.title}
                                onChange={handleInput}
                                error={errors.title}
                                fullWidth
                            />
                        </Grid>
                        {/* sub titile */}
                        <Grid item xs={12}>
                            <CustomInput
                                autoFocus
                                name="sub_title"
                                label="sub Title"
                                value={values.sub_title}
                                onChange={handleInput}
                                error={errors.sub_title}
                                fullWidth
                            />
                        </Grid>
                        {/* body */}
                        <Grid item xs={12}>
                            <CustomJoditEditor
                                innerRef={editor}
                                value={values.description}
                                values={values}
                                setValues={setValues}
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
