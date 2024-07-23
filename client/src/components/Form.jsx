import React, { useState } from "react";
import * as Yup from "yup";
import Spinner from "./Spinner";
import { AxiosError } from "axios";

const Form = ({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
  handleSpinner,
  spinner,
  handleErrorMessage,
  error,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const fieldValue =
      type === "checkbox" ? (checked ? "true" : "false") : value;

    setFormData({ ...formData, [name]: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSpinner && handleSpinner(true);
    handleErrorMessage && handleErrorMessage("");
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await onSubmit(formData);
      setFormData(initialValues);
      setErrors({});
      handleSpinner && handleSpinner(false);
    } catch (error) {
      handleSpinner && handleSpinner(false);
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((e) => {
          if (e.path) {
            newErrors[e.path] = e.message;
          }
        });
        setErrors(newErrors);
      } else {
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.data
        ) {
          if (error.response.data.errors) {
            const apiErrors = error.response.data.errors;
            const newErrors = {};

            Object.keys(apiErrors).forEach((key) => {
              if (Array.isArray(apiErrors[key])) {
                newErrors[key] = apiErrors[key].join(", ");
              }
            });

            setErrors(newErrors);
          } else {
            setErrors({ error });
            handleErrorMessage && handleErrorMessage(error.response.data.error);
          }
        }
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {error && (
        <span
          style={{
            display: "block",
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </span>
      )}
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          {field.type !== "checkbox" && (
            <label htmlFor={field.name}>{field.label}</label>
          )}
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            >
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            field.options.map((option) => (
              <label key={option.value}>
                {option.label}
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                />
              </label>
            ))
          ) : field.type === "checkbox" ? (
            <label>
              <input
                type={field.type || "checkbox"}
                name={field.name}
                checked={formData[field.name]}
                onChange={handleChange}
              />
              {field.label}
            </label>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              rows="6"
              placeholder={field.placeholder || ""}
            />
          ) : (
            <input
              type={field.type || "text"}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          )}
          {errors[field.name] && (
            <span style={{ color: "red" }}>{errors[field.name]}</span>
          )}
        </div>
      ))}
      {!spinner ? (
        <button type="submit" className="submit-button">
          Submit
        </button>
      ) : (
        <Spinner />
      )}
    </form>
  );
};

export default Form;
