import React, { useEffect, useState } from 'react'
import { CustomComponents } from '@/ui-component';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { createProductAction, updateProductAction } from '@/lib/store/thunks/productAction';
import { setTaskLoader } from '@/lib/store/features/loader/loaderSlice';
import { getCategoriesAction } from '@/lib/store/thunks/categoryAction';
import { getTagsAction } from "@/lib/store/thunks/tagAction";
import MenuItem from '@mui/material/MenuItem';


const initialFormValues = {
    id: '',
    product_name: '',
    description: '',
    categories:[],
    barcode:'',
    sku:'',
    price:0,
    discount:0,
    brand:'',
    product_image:[],
    tags:[],
    is_active: true,
};

export default function AddProduct(props:any) {
    const dispatch = useAppDispatch();
    const stateCategories = useAppSelector((state)=> state.categoryReducer.categories);
    const stateTags = useAppSelector((state)=> state.tagReducer.tags);

    const CustomInput = CustomComponents.CustomInput;
    const CustomForm = CustomComponents.CustomForm;
    const UseForm = CustomComponents.UseForm;
    const MultiSelect = CustomComponents.MultiSelect;

    // categories
    useEffect(() => {
        if (stateCategories.length < 1) {
          dispatch(getCategoriesAction());
        }
    }, [])

    // tags
    useEffect(() => {
        if (stateTags.length < 1) {
            dispatch(getTagsAction());
        }
    }, [])
    

    // validation
    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('product_name' in fieldValues) {
            temp.product_name = fieldValues.product_name ? "" : "Product name is required!"
        }

        if ('description' in fieldValues) {
            temp.description = fieldValues.description ? "" : "Description is required!"
        }

        if ('categories' in fieldValues) {
            temp.categories = fieldValues.categories.length ? "" : "Category is required!"
        }

        if ('barcode' in fieldValues) {
            temp.barcode = fieldValues.barcode ? "" : "Barcode is required!"
        }

        if ('sku' in fieldValues) {
            temp.sku = fieldValues.sku ? "" : "sku is required!"
        }

        if ('price' in fieldValues) {
            temp.price = fieldValues.price ? "" : "price is required!"
        }

        if ('discount' in fieldValues) {
            temp.discount = fieldValues.discount ? "" : "discount is required!"
        }

        if ('brand' in fieldValues) {
            temp.brand = fieldValues.brand ? "" : "brand is required!"
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
            formData.append('product_name', values.product_name);
            formData.append('description', values.description);
            formData.append('barcode', values.barcode);
            formData.append('brand', values.brand);
            formData.append('categories', JSON.stringify(values.categories));
            formData.append('discount', values.discount);
            formData.append('price', values.price);
            formData.append('product_image', values.product_image);
            formData.append('sku', values.sku);
            formData.append('tags', JSON.stringify(values.tags));
            formData.append('is_active', values.is_active);
            
            dispatch(setTaskLoader(true));
            if (_id) {                
                dispatch(updateProductAction(formData));
            }else{
                dispatch(createProductAction(formData));
            }
        }
    }

    useEffect(() => {
        if (props.recordForEdit) {            
            setValues({
                id: props.recordForEdit._id,
                product_name: props.recordForEdit.product_name,
                description: props.recordForEdit.description,
                barcode: props.recordForEdit.barcode,
                brand: props.recordForEdit.brand,
                categories: props.recordForEdit.categories,
                discount: props.recordForEdit.discount,
                price: props.recordForEdit.price,
                sku: props.recordForEdit.sku,
                tags: props.recordForEdit.tags,
                is_active: props.recordForEdit.is_active,
            })
            setButtonText('Update');
        }else{
            setButtonText('Submit');
        }
    }, [props.recordForEdit]);

    return (
        <>
            <CustomForm onSubmit={saveRecord} id="PRODUCT_FORM" encType="multipart/form-data">
                <CustomComponents.FormDialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CustomInput
                                autoFocus
                                name="product_name"
                                label="Product Name"
                                value={values.product_name}
                                onChange={handleInput}
                                error={errors.product_name}
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
                                fullWidth
                            />
                        </Grid>
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
                                {stateCategories.map((category: {_id:string, category_name:string}) => (
                                    <MenuItem
                                    key={category._id}
                                    value={category._id}
                                    >
                                        {category.category_name}
                                    </MenuItem>
                                ))}
                            </MultiSelect>
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                name="barcode"
                                label="Barcode"
                                value={values.barcode}
                                onChange={handleInput}
                                error={errors.barcode}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                name="sku"
                                label="SKU"
                                value={values.sku}
                                onChange={handleInput}
                                error={errors.sku}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                name="price"
                                label="Price"
                                value={values.price}
                                onChange={handleInput}
                                error={errors.price}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                name="discount"
                                label="Discount"
                                value={values.discount}
                                onChange={handleInput}
                                error={errors.discount}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CustomInput
                                label="Brand"
                                name="brand"
                                value={values.brand}
                                onChange={handleInput}
                                error={errors.brand}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MultiSelect
                                id="tags"
                                name="tags"
                                label="Select Tags"
                                label_id="tags"
                                value={values.tags}
                                error={errors.tags}
                                onChange={handleInput}
                                variant="outlined"
                            >
                                {stateTags.map((tag: {_id:string, name:string}) => (
                                    <MenuItem
                                    key={tag._id}
                                    value={tag._id}
                                    >
                                        {tag.name}
                                    </MenuItem>
                                ))}
                            </MultiSelect>
                        </Grid>
                        {/* product_image
                        is_active */}
                    </Grid>
                </CustomComponents.FormDialogContent>

                <CustomComponents.DialogActionButton
                    buttonText={buttonText}
                />
            </CustomForm>
        </>
    )
}
