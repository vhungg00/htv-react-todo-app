import React, { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";

import { Container } from "@/components/Container";
import { ErrorInput } from "@/components/ErrorInput";

import "./FormMultipleSteps.scss";
import { useCurrentStep } from "@/hooks/useCurrentStep";

export type FormRegister = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dd: string;
  nn: string;
  yyyy: string;
  uname: string;
  pword: string;
};

export const fnameId = "fname";
export const lnameId = "lname";
export const emailId = "email";
export const phoneId = "phone";
export const dayId = "dd";
export const monthId = "nn";
export const yearId = "yyyy";
export const unameId = "uname";
export const pwordId = "pword";

/* study: https://www.w3schools.com/howto/howto_js_form_steps.asp */

export const FormWithMultipleSteps: React.FC = () => {
  const { register, handleSubmit, control, watch } = useForm<FormRegister>({
    mode: "onBlur",
  });

  const firstNameValue: string = watch(fnameId);
  const lastNameValue: string = watch(lnameId);

  const { errors } = useFormState({ control });

  const goNext: SubmitHandler<FormRegister> = useCallback((data) => {
    console.log(data);
  }, []);

  const {} = useCurrentStep();

  return (
    <>
      <Helmet>
        <title>Form with multiple steps</title>
      </Helmet>
      <Container>
        <form id="regForm" onSubmit={handleSubmit(goNext)}>
          <h1 className="heading">Register</h1>

          <div className="tab">
            Contact Info:
            <dl className="form-group">
              <dt className="form-label">Email</dt>
              <dd className="form-control">
                <label htmlFor={emailId}>
                  <input
                    id={emailId}
                    className="input-control"
                    placeholder="Email..."
                    {...register(emailId, {
                      required: {
                        value: true,
                        message: "Vui lòng nhập trường này",
                      },
                    })}
                    data-error={!!errors[emailId]}
                    data-complete={!!firstNameValue}
                  />
                </label>
              </dd>
            </dl>
            {errors[emailId] && <ErrorInput errors={errors[emailId]} />}
            <dl className="form-group">
              <dt className="form-label">Phone</dt>
              <dd className="form-control">
                <label htmlFor={phoneId}>
                  <input
                    id={phoneId}
                    className="input-control"
                    placeholder="Phone..."
                    {...register(phoneId, {
                      required: {
                        value: true,
                        message: "Vui lòng nhập trường này",
                      },
                    })}
                    data-error={!!errors[phoneId]}
                    data-complete={!!firstNameValue}
                  />
                </label>
              </dd>
            </dl>
            {errors[phoneId] && <ErrorInput errors={errors[phoneId]} />}
          </div>

          <div className="actions">
            <div className="actions-box">
              <button type="button" id="prevBtn">
                Previous
              </button>
              <button type="submit" id="nextBtn">
                Next
              </button>
            </div>
          </div>

          {/* <!-- Circles which indicates the steps of the form: --> */}
          <div className="steps-box">
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
            <span className="step"></span>
          </div>
        </form>
      </Container>
    </>
  );
};
