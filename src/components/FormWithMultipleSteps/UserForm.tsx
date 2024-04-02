import React from "react";

import { fnameId, lnameId } from './FormMultipleSteps';
import { UseFormRegister, FieldValues, FieldError } from "react-hook-form";
import { ErrorInput } from "../ErrorInput";

type UserFormProps = {
    errors: FieldError
    register: UseFormRegister<FieldValues>
}

export const UserForm: React.FC<UserFormProps> = ({register, errors}) => {

    return (
        <>
            <div className="tab">Name:
                <dl className="form-group">
                    <dt className="form-label">
                        First name
                    </dt>
                    <dd className="form-control">
                        <label htmlFor={fnameId}>
                            <input
                                id={fnameId}
                                className="input-control"
                                placeholder="First name..." 
                                {...register(fnameId, {
                                    required: { value: true, message: 'Vui lòng nhập trường này' }
                                })}
                                data-error={!!errors[fnameId]}
                                data-complete={!!firstNameValue}

                            /></label>
                    </dd>
                </dl>
                {errors[fnameId] && <ErrorInput error={errors[fnameId]} />}

                <dl className="form-group">
                    <dt className="form-label">
                        Last name
                    </dt>
                    <dd className="form-control">
                        <label htmlFor={lnameId}>
                            <input
                                id={lnameId}
                                className="input-control"
                                placeholder="Last name..." {...register(lnameId, {
                                    required: { value: true, message: 'Vui lòng nhập trường này' }
                                })}
                                data-error={!!errors[lnameId]}
                                data-complete={!!lastNameValue}

                            /></label>
                    </dd>
                </dl>
                {errors[lnameId] && <ErrorInput error={errors[lnameId]} />}
            </div>
        </>
    )
}