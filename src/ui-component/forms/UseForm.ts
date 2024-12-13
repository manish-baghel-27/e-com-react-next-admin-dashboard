"use client"

import { useState } from 'react'

export function UseForm(initial_form_values: any, validateOnChange = false, validate: any, resetImage:any = '') {
    const [values, setValues] = useState(initial_form_values);
    const [errors, setErrors] = useState(Object);

    const handleInput = (e:any) => {
        // e.persist();
        const { name, value } = e.target;
        
        setValues({ ...values, [name]: value });

        if (validateOnChange) {
            validate({ [name]: value })
        }
    }

    const resetForm = () => {
        setValues(initial_form_values);
        if (typeof resetImage === 'function') {
            resetImage();
        }
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInput,
        resetForm,
    }
}