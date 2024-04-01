import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, SubmitHandler } from 'react-hook-form';

import { Container } from "../Container";

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



    return (
        <>
            <Helmet>
                <title>Form with multiple steps</title>
            </Helmet>
            <Container>
                <h2 className='heading'>Register</h2>
                <form id="regForm">

                </form>
            </Container>
        </>
    )
}