import React from "react";

import { FormRegister, fnameId, lnameId } from "./FormMultipleSteps";
import {
  FieldError,
  DeepMap,
  UseFormWatch,
  UseFormRegisterReturn,
} from "react-hook-form";
import { ErrorInput } from "../ErrorInput";

type UserFormProps = {
  watch: UseFormWatch<FormRegister>;
  errors: DeepMap<FormRegister, FieldError>;
  register: UseFormRegisterReturn;
};

export const UserForm: React.FC<UserFormProps> = ({
  watch,
  register,
  errors,
}) => {
  const firstNameValue: string = watch(fnameId);
  const lastNameValue: string = watch(lnameId);

  return (
    <>
      <div className="tab">
        Name:
        <dl className="form-group">
          <dt className="form-label">First name</dt>
          <dd className="form-control">
            <label htmlFor={fnameId}>
              <input
                id={fnameId}
                className="input-control"
                placeholder="First name..."
                {...register}
                data-error={!!errors[fnameId]}
                data-complete={!!firstNameValue}
              />
            </label>
          </dd>
        </dl>
        {errors[fnameId] && <ErrorInput errors={errors[fnameId]} />}
        
        <dl className="form-group">
          <dt className="form-label">Last name</dt>
          <dd className="form-control">
            <label htmlFor={lnameId}>
              <input
                id={lnameId}
                className="input-control"
                placeholder="Last name..."
                {...register}
                data-error={!!errors[lnameId]}
                data-complete={!!lastNameValue}
              />
            </label>
          </dd>
        </dl>
        {errors[lnameId] && <ErrorInput errors={errors[lnameId]} />}
        
      </div>
    </>
  );
};
