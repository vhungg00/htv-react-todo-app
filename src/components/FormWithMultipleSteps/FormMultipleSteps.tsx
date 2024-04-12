import React, { useCallback, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import Steps from "rc-steps";
import "rc-steps/assets/index.css";

import { Container } from "@/components/Container";
import { ErrorInput } from "@/components/ErrorInput";

import "./FormMultipleSteps.scss";
import { useCurrentStep } from "@/hooks/useCurrentStep";
import { ReturnLink } from "../ReturnLink";

export type FormRegister = {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  uname: string;
  pword: string;
};

export const fnameId = "fname";
export const lnameId = "lname";
export const emailId = "email";
export const phoneId = "phone";
export const unameId = "uname";
export const pwordId = "pword";

/* study: https://www.w3schools.com/howto/howto_js_form_steps.asp */

export const FormWithMultipleSteps: React.FC = () => {
  const { register, handleSubmit, control, watch } = useForm<FormRegister>({
    criteriaMode: "all",
    mode: "onBlur",
  });

  const firstNameValue: string = watch(fnameId);
  const lastNameValue: string = watch(lnameId);
  const emailVaue: string = watch(emailId);
  const phoneValue: string = watch(phoneId);
  const userNameValue: string = watch(unameId);
  const passwordValue: string = watch(pwordId);

  const { errors, isValid } = useFormState({ control });
  console.log(isValid);

  const { currentStep, handleStepChange } = useCurrentStep();

  const goNext: SubmitHandler<FormRegister> = useCallback((data) => {
    console.log(data);
    handleStepChange(1, null, 2);
  }, []);

  return (
    <>
      <Helmet>
        <title>Form with multiple steps</title>
      </Helmet>
      <Container>
        <ReturnLink />
        <form id="regForm" onSubmit={handleSubmit(goNext)}>
          <h1 className="heading">Register</h1>
          {currentStep === 0 && (
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
                      {...register(fnameId, {
                        required: {
                          value: true,
                          message: "Vui lòng nhập trường này",
                        },
                      })}
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
                      {...register(lnameId, {
                        required: {
                          value: true,
                          message: "Vui lòng nhập trường này",
                        },
                      })}
                      data-error={!!errors[lnameId]}
                      data-complete={!!lastNameValue}
                    />
                  </label>
                </dd>
              </dl>
              {errors[lnameId] && <ErrorInput errors={errors[lnameId]} />}
            </div>
          )}

          {currentStep === 1 && (
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
                      data-complete={!!emailVaue}
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
                      data-complete={!!phoneValue}
                    />
                  </label>
                </dd>
              </dl>
              {errors[phoneId] && <ErrorInput errors={errors[phoneId]} />}
            </div>
          )}

          {currentStep === 2 && (
            <div className="tab">
              Login Info:
              <dl className="form-group">
                <dt className="form-label">User name</dt>
                <dd className="form-control">
                  <label htmlFor={unameId}>
                    <input
                      id={unameId}
                      className="input-control"
                      placeholder="User name..."
                      {...register(unameId, {
                        required: {
                          value: true,
                          message: "Vui lòng nhập trường này",
                        },
                      })}
                      data-error={!!errors[unameId]}
                      data-complete={!!userNameValue}
                    />
                  </label>
                </dd>
              </dl>
              {errors[unameId] && <ErrorInput errors={errors[unameId]} />}
              <dl className="form-group">
                <dt className="form-label">Password</dt>
                <dd className="form-control">
                  <label htmlFor={pwordId}>
                    <input
                      id={pwordId}
                      className="input-control"
                      placeholder="Phone..."
                      {...register(pwordId, {
                        required: {
                          value: true,
                          message: "Vui lòng nhập trường này",
                        },
                      })}
                      data-error={!!errors[pwordId]}
                      data-complete={!!passwordValue}
                    />
                  </label>
                </dd>
              </dl>
              {errors[pwordId] && <ErrorInput errors={errors[pwordId]} />}
            </div>
          )}

          <div className="actions">
            <div className="actions-box">
              {currentStep === 0 ? (
                ""
              ) : (
                <button
                  type="button"
                  onClick={() => handleStepChange(-1)}
                  id="prevBtn"
                >
                  Previous
                </button>
              )}
              <button type="submit" id="nextBtn">
                {currentStep === 2 && isValid ? "Submit" : "Next"}
              </button>
            </div>
          </div>

          {/* <!-- Circles which indicates the steps of the form: --> */}
          <div className="steps-box">
            <Steps
              current={currentStep}
              items={[
                { title: "Name" },
                { title: "Contact Info" },
                { title: "Login Info" },
              ]}
            />
          </div>
        </form>
      </Container>
    </>
  );
};
