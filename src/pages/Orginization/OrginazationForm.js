import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as userTypeService from "../../services/userTypeService";
import { addMinutes } from 'date-fns';


const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    address1:'',
    address2:'',
    country:'',
    state:'',
    zipcode:'',
    departmentId: '',
    isActive: false,
}

export default function OrginizationForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('email' in fieldValues)
             temp.email = fieldValues.email ? "" : "This field is required."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        if ('address1' in fieldValues)
            temp.address1 = fieldValues.address1 ? "" : "This field is required."
        if ('country' in fieldValues)
            temp.country = fieldValues.country ? "" : "This field is required."
        if ('state' in fieldValues)
            temp.state = fieldValues.state ? "" : "This field is required."
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "This field is required."
        if ('zipcode' in fieldValues)
            temp.zipcode = fieldValues.zipcode ? "" : "This field is required." 
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Orginization Name"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                        size="small"
                    />
                    <Controls.Input
                        label="Orginization Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        size="small"
                    />
                    <Controls.Input
                        label="(000) - 000 - 0000"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        helperText="Please enter your organization's phone number"
                        error={errors.mobile}
                        size="small"
                    />
                      
                     <Controls.Input
                        label="Address Line 1"
                        name="address1"
                        value={values.address1}
                        onChange={handleInputChange}
                        error={errors.address1}
                        size="small"
                    />
                    <Controls.Input
                        label="Address Line 2"
                        name="address2"
                        value={values.address2}
                        onChange={handleInputChange}
                        size="small"
                    />  
                </Grid>
                <Grid item xs={6}>
                    
                <Controls.Input
                        label="Country"
                        name="country"
                        value={values.country}
                        onChange={handleInputChange}
                        error={errors.country}
                        size="small"
                    />
                    <Controls.Input
                        label="State"
                        name="state"
                        value={values.state}
                        onChange={handleInputChange}
                        error={errors.state}
                        size="small"
                    />
                      <Controls.Input
                        label="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        size="small"
                    />
                    <Controls.Input
                        label="Zipcode"
                        name="zipcode"
                        value={values.zipcode}
                        onChange={handleInputChange}
                        error={errors.zipcode}
                        size="small"
                    />
                     <Controls.Select
                        name="departmentId"
                        size="small"
                        label="Department"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={userTypeService.getDepartmentCollection()}
                        error={errors.departmentId}
                    />     
                    <Controls.Checkbox
                        name="isActive"
                        label="Is Active"
                        value={values.isActive}
                        onChange={handleInputChange}
                        size="small"
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}


