import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }: any) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }: any) => {
  // We need to tell useField what type of input this is
  // since React treats radios and checkboxes differently
  // than inputs/select/textarea.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MySelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

// And now we can use these
const SignupForm = () => {
  return (
    <>
      <h1>Modify Availability Class</h1>
      <Formik
        initialValues={{
          className: "",
          email: "",
          acceptedTerms: false, // added for our checkbox
          classType: "", // added for our select
        }}
        validationSchema={Yup.object({
          className: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          classType: Yup.string()
            .oneOf(["ABC-123", "ABC-456", "XYZ-123", "XYZ-456"])
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <MyTextInput
            label="Class Name"
            name="className"
            type="text"
            placeholder="My Availability Class"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="bob@serviceprovider.com"
          />
          <MySelect label="Class Type" name="classType">
            <option value="">Select a class type</option>
            <option value="ABC-123">ABC-123</option>
            <option value="ABC-456">ABC-456</option>
            <option value="XYZ-123">XYZ-123</option>
            <option value="XYZ-456">XYZ-456</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

ReactDOM.render(<SignupForm />, document.getElementById("root"));
