import React, { useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, SubmitHandler, useFormState } from 'react-hook-form';

import { Container } from "../Container";

import './FormMultipleSteps.scss';

export type FormRegister = {
    fname: string,
    lname: string,
    email: string,
    phone: string,
    dd: string,
    nn: string,
    yyyy: string,
    uname: string,
    pword: string
}

/* study: https://www.w3schools.com/howto/howto_js_form_steps.asp */


export const FormWithMultipleSteps: React.FC = () => {

    const { register, handleSubmit, control, watch } = useForm<FormRegister>({ shouldUnregister: true });

    const firstNameValue: string = watch('fname');
    
    const { errors, isDirty, isValid } = useFormState({control});

    console.log('errors', errors['fname'])

    const goNext:SubmitHandler<FormRegister> = useCallback((data) => {
        console.log(data);
    },[]);

    return (
        <>
            <Helmet>
                <title>Form with multiple steps</title>
            </Helmet>
            <Container>
                <form id="regForm" onSubmit={handleSubmit(goNext)}>
                <h1 className='heading'>Register</h1>
                    <div className="tab">Name:
                    <dl className="form-group">
                        <dt className="form-label">
                            First name
                        </dt>
                            <dd className="form-control">
                                <label htmlFor="firstName">
                                <input 
                                    id="firstName"
                                    className="input-control"
                                    placeholder="First name..." {...register('fname', {
                                    required: { value: true, message:'Vui lòng nhập trường này'}
                                    })}
                                    data-error={!!errors['fname']}
                                    data-complete={!!firstNameValue}

                                /></label>
                            </dd>
                    </dl>
                        <label htmlFor="lastName">
                            Last name:
                            <input id="lastName" placeholder="Last name..." {...register('lname')} /></label>
                    </div>
                    <div className="tab">Contact Info:
                        <label><input placeholder="E-mail..." {...register('email')} /></label>
                        <label><input placeholder="Phone..." {...register('phone')} /></label>
                    </div>
                    <div style={{overflow: 'auto'}}>
                        <div style={{float: 'right'}}>
                        <button type="button" id="prevBtn">Previous</button>
                        <button type="submit" id="nextBtn">Next</button>
                        </div>
                    </div>  
                </form>
            </Container>
        </>
    )
}