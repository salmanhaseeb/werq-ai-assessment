import React, { useState } from "react";
import * as Yup from "yup";
import Form from "../components/Form";
import UserService from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const fields = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  {
    name: "password_confirmation",
    label: "Confirm Password",
    type: "password",
  },
];

const initialValues = {
  email: "",
  password: "",
  password_confirmation: "",
  first_name: "",
  last_name: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
  username: Yup.string().required("Username is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
});

const Register = () => {
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const response = await UserService.registerUser(data);
      navigate('/login');
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSpinner = (bool) => {
    setSpinner(bool);
  };

  const handleErrorMessage = (message) => {
    setError(message);
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Register</h2>
        <p>
          Welcome to our platform! Please fill out the form below to create your
          account.
        </p>
        <Form
          fields={fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          handleSpinner={handleSpinner}
          spinner={spinner}
          handleErrorMessage={handleErrorMessage}
          error={error}
        />
        <p>
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
